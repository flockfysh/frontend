import { forwardRef, useState, useId, useRef, useEffect } from 'react';

import { uploadTypeMapping } from '@/helpers/assets/upload';
import classes from './styles.module.css';

type FileUploadProps = {
    containerClassName?: string;
    name?: string;
    datasetType?: Flockfysh.AssetType;
    uploadContainerClassName?: string;
};

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    function FileUpload(props: FileUploadProps, ref) {
        const id = useId();

        const mapping = props.datasetType
            ? uploadTypeMapping[props.datasetType]
            : undefined;

        const internalRef = useRef<HTMLInputElement | null>(null);
        const [fileCount, setFileCount] = useState(0);

        useEffect(() => {
            if (internalRef.current) {
                internalRef.current.value = '';

                setFileCount(internalRef.current?.files?.length ?? 0);
            }
        }, [props.datasetType]);

        return (
            <div
                className={
                    classes.container +
                    ' ' +
                    (props.containerClassName ? props.containerClassName : '')
                }
            >
                <label htmlFor={ id }>
                    <div
                        className={
                            classes.customUploadContainer +
                            ' ' +
                            (props.uploadContainerClassName
                                ? props.uploadContainerClassName
                                : '')
                        }
                    >
                        <h1>Drag and drop or select file to upload</h1>

                        <p>
                            { mapping?.extHints.join(', ') ??
                                'Select dataset type to insert files' }
                        </p>

                        <p>{ fileCount } files selected</p>
                    </div>
                </label>

                <input
                    id={ id }
                    multiple={ true }
                    disabled={ !mapping }
                    type="file"
                    accept={ mapping?.accept }
                    name={ props.name }
                    onChange={ (e) => {
                        setFileCount(e.currentTarget.files?.length ?? 0);
                    } }
                    ref={ (e) => {
                        internalRef.current = e;
                        if (typeof ref === 'function') ref(e);
                        else if (ref) ref.current = e;
                    } }
                />
            </div>
        );
    }
);

export default FileUpload;
