import { ReactSVG } from 'react-svg';
import upload from '@/icons/main/upload.svg';
import help from '@/icons/main/help-circle.svg';
import AsyncArray from '@/helpers/async';
import api from '@/helpers/api';
import classes from './styles.module.css';

export interface FileUploaderProps {
    datasetId: string;
}

async function uploadAssets(datasetId: string, files: File[]) {

    async function upload(file: File) {
        try {
            const fd = new FormData();
            fd.set('image', file);
            await api.post(`/api/datasets/${datasetId}/assets/upload/image`);
        }
        catch (e) {
            console.error(e);
        }
    }

    await new AsyncArray(files).chunkMap(file => upload(file), undefined, {
        maxThreads: 20,
    });
}


export default function FileUploader(props: FileUploaderProps) {
    return (
        <div className={ classes.uploadDataWrapper }>
            <ReactSVG className={ classes.uploadDataIcon } src={ upload.src } />

            <div className={ classes.uploadDataInfo }>
                <p className={ classes.uploadDataDesc }>Drag and drop or select file to upload</p>

                <small>png, jpg, gif, mp4, mov, webm, pdf</small>
                
                <small className={ classes.uploadDataSubDesc }>
                    Stored on file system
                    <button className={ classes.helpButton }>
                        <ReactSVG src={ help.src } />
                    </button>
                </small>
            </div>

            <input type="file" accept="image/*" className={ classes.fileInput } onChange={ function (e) {
                const files = e.currentTarget.files ?? [];
                if (files.length > 0) {
                    uploadAssets(props.datasetId, Array.from(files)).then();
                }
                e.currentTarget.value = '';
            } } />
        </div>
    );
}
