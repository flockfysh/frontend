import { forwardRef } from 'react';
import { ReactSVG } from 'react-svg';

// import help from '@icons/main/help.svg';

import classes from './styles.module.css';

const FileUpload = forwardRef<HTMLInputElement>(function() {
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
                        {/* <ReactSVG src={ help.src } /> */}
                    </p>
                </div>
            </label>

            <input id="file-upload" type="file" />
        </div>
    );
});

export default FileUpload;
