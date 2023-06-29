import { useState, useEffect } from 'react';

import ModalBase from './modalBase';

import classes from './modals.module.css';

export interface FilePreviewProps {
    file: File;
    closeModal: () => void;
}

export function FilePreview(props: FilePreviewProps) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const newUrl = URL.createObjectURL(props.file);
        
        setUrl(newUrl);

        return () => {
            URL.revokeObjectURL(newUrl);
        };
    }, [props.file]);

    return (
        <ModalBase title={ props.file.name } closeModal={ props.closeModal }>
            <div className={ classes.imageContainer }>
                <img src={ url } alt={ props.file.name } className={ classes.image } />
            </div>
        </ModalBase>
    );
}
