import api from '../../../../helpers/api';

function delay(secs: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, secs * 1000));
}

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

    constructor(boxClass: number, serverId?: string, boundingBox?: AnnotationBox) {
        this.#serverId = serverId;
        this.#class = boxClass;

        if (boundingBox) this.#boundingBox = boundingBox;
    }

    // POST request to create annotation box.
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

    // PUT request to edit annotation box.
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

    // DELETE request to delete annotation box.
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
