import React from 'react';
import { v4 } from 'uuid';

import Button from '../../button/button';
import FileInputCard from './fileItemCard';

import mimeChecker from '../../../../helpers/mimeChecker';

import classes from './multiFileInput.module.css';

interface FileInputProps extends React.ComponentPropsWithRef<'input'> {
    classNames?: {};
    maxFileCount?: number;
    buttonLabel?: string;
    setErrorMessage?: (msg: string) => void;
}

interface FileInputInternalState {
    files: Map<string, File>;
}

const MultiFileInput = React.forwardRef<HTMLInputElement, FileInputProps>(function FileInput(props, ref) {
    const { classNames, children, maxFileCount, buttonLabel, setErrorMessage, ...inputProps } = props;

    children;
    maxFileCount;
    classNames;

    const [fileDropOverlayVisible, setFileDropOverlayVisible] = React.useState(false);
    const [internalState, setInternalState] = React.useState<FileInputInternalState>(() => {
        return {
            files: new Map(),
        };
    });

    const internalFileInputRef = React.useRef<HTMLInputElement | null>(null);
    const dragOverTimeoutRef = React.useRef<NodeJS.Timeout | number | null>(null);

    const _maxFileCount = maxFileCount ?? Infinity;

    function refreshFilesInInput() {
        const newFileList = new DataTransfer();

        for (const file of internalState.files.values()) {
            newFileList.items.add(file);
        }

        if (!internalFileInputRef.current) throw new Error('Attempting to refresh internal files before the input element appears.');

        internalFileInputRef.current.files = newFileList.files;
    }

    function dragOverHandler() {
        if (dragOverTimeoutRef.current) clearTimeout(dragOverTimeoutRef.current);
        if (!fileDropOverlayVisible) setFileDropOverlayVisible(true);
        
        dragOverTimeoutRef.current = setTimeout(() => {
            setFileDropOverlayVisible(false);
        }, 500);
    }

    function dragEndHandler() {
        if (dragOverTimeoutRef.current) clearTimeout(dragOverTimeoutRef.current);
        
        setFileDropOverlayVisible(false);
    }

    function dropHandler(event: React.DragEvent<HTMLInputElement>) {
        setFileDropOverlayVisible(false);
        // Empty the files target!
        event.currentTarget.files = new DataTransfer().files;

        return props.onDrop?.(event);
    }

    function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setFileDropOverlayVisible(false);
        const filesInInput = event.currentTarget.files;

        const unableToUpload: string[] = [];

        if (filesInInput) {
            for (const file of filesInInput) {
                if (internalState.files.size >= _maxFileCount) break;
                if (props.accept && !mimeChecker(file.type, props.accept)) {
                    unableToUpload.push(file.name);

                    continue;
                }
                
                let uuid;

                do {
                    uuid = v4();
                } while (internalState.files.has(uuid));
                
                internalState.files.set(uuid, file);
            }
        }

        if(unableToUpload.length) {
            let badFileString: string;

            if (unableToUpload.length <= 5) badFileString = unableToUpload.join(', ');
            else badFileString = `${ unableToUpload.slice(0, 5).join(', ') } and ${ unableToUpload.length - 5 } more`;

            setErrorMessage!(`These files failed to upload: ${ badFileString }. Please make sure to upload the correct type of file.`);
        }

        refreshFilesInInput();
        // You'll need to update the files attribute early so that the
        // onChange event handler works with the new file values.
        setInternalState(() => ({
            files: internalState.files
        }));
        
        return props.onChange?.(event);
    }

    function removeFile(id: string) {
        internalState.files.delete(id);

        if (internalFileInputRef.current) {
            internalFileInputRef.current.files = new DataTransfer().files;
            internalFileInputRef.current?.dispatchEvent(new Event('input', {
                bubbles: true,
            }));
        }
    }

    return (
        <div 
            className={ `${ classes.masterContainer } ${ props.className || '' }` }
            onDragOver={ dragOverHandler }
            onDragEnd={ dragEndHandler }
        >
            <div className={ `${ classes.fileInputContainer }` }>
                <div
                    className={ `${ classes.fileDropOverlay } ${ fileDropOverlayVisible ? classes.fileDropOverlayVisible : '' }` }>
                    Drop here to upload
                </div>

                <input 
                    type="file"
                    multiple { ...inputProps }
                    className={ `${ classes.fileInput } ${ fileDropOverlayVisible ? classes.fileInputVisible : '' }` }
                    onDrop={ dropHandler }
                    onInput={ inputHandler } ref={ 
                        e => {
                            if (typeof ref === 'function') ref(e);
                            else if (ref) ref.current = e;
                    
                            internalFileInputRef.current = e;
                        } 
                    }
                />

                <div className={ classes.inputRow }>
                    <Button 
                        className={ classes.inputButton } 
                        gradient={ true } 
                        onClick={ 
                            () => internalFileInputRef.current?.click()
                        }
                    >
                        { buttonLabel ?? 'Add file' }
                    </Button>

                    { _maxFileCount !== Infinity
                        ?
                        (
                            <span
                                className={ classes.fileCount }>{ internalState.files.size }/{ maxFileCount } files uploaded
                            </span>
                        )
                        : <span className={ classes.fileCount }>{ internalState.files.size } files uploaded</span> 
                    }
                </div>
            </div>

            { internalState.files.size ?
                (
                    <ul className={ classes.fileList }>
                        {
                            [...internalState.files.entries()].map(([id, file], index) => (
                                <FileInputCard
                                    key={ id }
                                    file={ file }
                                    id={ id }
                                    index={ index }
                                    removeFile={ removeFile }
                                />
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    );
});

export default MultiFileInput;
