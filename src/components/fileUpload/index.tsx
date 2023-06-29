import { forwardRef } from 'react';

import classes from './styles.module.css';

// ! Add types
type FileUploadProps = {
    containerClassName?: string;
    uploadContainerClassName?: string;
}

// TODO: add loading graphic to upload
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(props: FileUploadProps, _ref) {
    return (
        <div className={ classes.container + ' ' + (props.containerClassName ? props.containerClassName : '') }>
            <label htmlFor="file-upload">
                <div className={ classes.customUploadContainer  + ' ' + (props.uploadContainerClassName ? props.uploadContainerClassName : '') }>
                    <h1>Drag and drop or select file to upload</h1>

                    <p>
                        png, jpg, gif, mp4, mov, webm, pdf
                    </p>

                    <p>
                        Stored on file system
                    </p>
                </div>
            </label>

            <input id="file-upload" type="file" />
        </div>
    );
});

export default FileUpload;
