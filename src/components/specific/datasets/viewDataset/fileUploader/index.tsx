import { ReactSVG } from 'react-svg';

import AsyncArray from '@/helpers/async';
import api from '@/helpers/api';

import upload from '@/icons/main/upload.svg';
import help from '@/icons/main/help-circle.svg';

import classes from './styles.module.css';

export interface FileUploaderProps {
    datasetId: string;
    datasetType: string;
}

async function uploadAssets(datasetId: string, files: File[], config: {
    endpoint: string,
    fieldName: string,
}) {
    async function upload(file: File) {
        try {
            const fd = new FormData();
            fd.set(config.fieldName, file);
            await api.post(`/api/datasets/${ datasetId }/assets/upload/${ config.endpoint }`, fd);
        }
        catch (e) {}
    }

    await new AsyncArray(files).chunkMap(file => upload(file), undefined, {
        maxThreads: 20,
    });
}

const typeMapping: Record<string, {
    accept: string,
    extHints: string[],
    endpoint: string,
    fieldName: string
}> = {
    image: {
        accept: 'image/*',
        extHints: ['.png', '.jpg', '.webp', '.jpeg'],
        endpoint: 'image',
        fieldName: 'image',
    },
    text: {
        accept: 'text/*',
        extHints: ['.txt', '.js', '.csv', '.html', '.rtf'],
        endpoint: 'text',
        fieldName: 'text',
    },
    other: {
        accept: '',
        extHints: ['.png', '.jpg', '.webp', '.jpeg', '.bin', '.mp3', '.doc', '.pdf'],
        endpoint: 'miscellaneous',
        fieldName: 'asset',
    }
};

export default function FileUploader(props: FileUploaderProps) {
    const typeData = typeMapping[props.datasetType] ?? typeMapping.other;

    return (
        <div className={ classes.uploadDataWrapper }>
            <ReactSVG className={ classes.uploadDataIcon } src={ upload.src } />

            <div className={ classes.uploadDataInfo }>
                <p className={ classes.uploadDataDesc }>Drag and drop or select file to upload</p>

                <small>{ typeData.extHints.join(', ') }</small>

                <small className={ classes.uploadDataSubDesc }>
                    Stored on file system
                    <button className={ classes.helpButton }>
                        <ReactSVG src={ help.src } />
                    </button>
                </small>
            </div>

            <input
                type="file"
                accept={ typeData.accept }
                multiple={ true }
                className={ classes.fileInput }
                onChange={ function (e) {
                    const files = e.currentTarget.files ?? [];
                    
                    if (files.length > 0) {
                        uploadAssets(props.datasetId, Array.from(files), {
                            endpoint: typeData.endpoint,
                            fieldName: typeData.fieldName,
                        }).then();
                    }

                    e.currentTarget.value = '';
                } }
            />
        </div>
    );
}
