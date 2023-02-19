import api from '../../../../helpers/api';

function delay(secs: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, secs * 1000));
}

/**
 * This class is a wrapper that adds, edits, and delete annotation boxes and synchronizes with the server.
 */
export default class AnnotationObject {
    // This server ID is the corresponding ID of the annotation box in the database.
    // However, since this is not available in the request, when editing.
    #serverId?: string;
    // When the user edits a newly added box, before the ID can be received, the system needs to poll
    // the serverID, otherwise we don't know which box ID to edit.
    // However, we will need to check if the polling function has already started.
    #pollQueued: boolean = false;

    #class: number;
    #boundingBox: AnnotationBox = {
        height: 0.5,
        width: 0.5,
        x: 0.5,
        y: 0.5,
    };
    #deleted: boolean = false;

    async #poll() {
        while (!this.#serverId) await delay(1);
    }

    async #edit() {
        if (!this.#serverId) throw new Error('This internal function cannot be called without having a server ID.');
        
        const { width, height, x, y } = this.#boundingBox;

        await api.put(`/api/annotation/${this.#serverId}`, {
            class: this.#class,
            boundingBox: [x, y, width, height],
        });
    }

    async #delete() {
        if (this.#deleted) throw new Error('This image has already been deleted.');
        if (!this.#serverId) throw new Error('This internal function cannot be called without having a server ID.');
        
        await api.delete(`/api/annotation/${this.#serverId}`);
    }

    /**
     *
     * @param boxClass The label index of the box.
     * @param serverId The ID from the server.
     * Lets the object tell which box it is when synchronizing with the server.
     * If the box is newly created, leave this empty.
     * @param boundingBox Annotation box data from the server.
     */
    constructor(boxClass: number, serverId?: string, boundingBox?: AnnotationBox) {
        this.#serverId = serverId;
        this.#class = boxClass;

        if (boundingBox) this.#boundingBox = boundingBox;
    }

    /**
     *
     * @param imageId Which image this new box belongs to.
     * @throws If the server cannot give an ID to the new bounding box.
     * Also throws if the box already belongs to another image.
     */
    async saveTo(imageId: string) {
        if (this.#serverId) throw new Error('This annotation box has already been created server-side.');
        
        const { width, height, x, y } = this.#boundingBox;

        const response = await api.post(`/api/annotation/${imageId}`, {
            class: this.#class,
            boundingBox: [x, y, width, height],
        });

        const newRemoteAnnotationBox = response.data.data;
        
        if (!newRemoteAnnotationBox.id) throw new Error('Annotation response from server is malformed.');
        
        this.#serverId = newRemoteAnnotationBox.id;
    }

    /**
     * Attempts to make a PUT request to edit the annotation box coordinates on the server.
     * If the annotation box does not have an ID from the server yet, the code will poll
     * and wait until the box gets a server ID.
     *
     * @param newData The new coordinates and dimensions of the box.
     */
    async edit(newData: AnnotationBox): Promise<void> {
        this.#boundingBox = newData;

        if (!this.#serverId) {
            if (!this.#pollQueued) {
                this.#pollQueued = true;
             
                await this.#poll();
            }
            else return;
        }

        await this.#edit();
    }

    get boundingBox() {
        return this.#boundingBox;
    }

    get class() {
        return this.#class;
    }

    /**
     * Attempts to make a DELETE request to remove the annotation box from the server.
     * If the annotation box does not have an ID from the server yet, it will poll
     * and wait until there is a server ID instead.
     *
     */
    async delete(): Promise<void> {
        if (!this.#serverId) {
            if (!this.#pollQueued) {
                this.#pollQueued = true;
                await this.#poll();
            }
            else return;
        }
        
        await this.#delete();
    }
}
