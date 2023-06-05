import { forwardRef } from 'react';

import classes from './styles.module.css';

const FileUpload = forwardRef<HTMLInputElement, {}>(function FileUpload(props, ref) {
    return (
        <div className={ classes.container }>
            <label htmlFor="file-upload">
                <div className={ classes.customUploadContainer }>
                    <h1>Drag and drop or select file to upload</h1>

                    <p>
                        png, jpg, gif, mp4, mov, webm, pdf
                    </p>

                    <p>
                        Stored on file system
                    </p>
                </div>
            </label>

            <input id="file-upload" type="file"/>
        </div>
    );
});

export default FileUpload;
