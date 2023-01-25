import React from "react";
import classes from "./multiFileInput.module.css";
import {v4} from "uuid";
import Button from "../button/button";

interface FileInputProps extends React.ComponentPropsWithRef<"input"> {
    classNames?: {};
    maxFileCount?: number;
    buttonLabel?: string;
}

interface FileInputInternalState {
    files: Map<string, File>;
}


const MultiFileInput = React.forwardRef<HTMLInputElement, FileInputProps>(function FileInput(props, ref) {
    let {classNames, children, maxFileCount, buttonLabel, ...inputProps} = props;
    const [fileDropOverlayVisible, setFileDropOverlayVisible] = React.useState(false);
    const [internalState, setInternalState] = React.useState<FileInputInternalState>(() => {
        return {
            files: new Map(),
        };
    });
    const internalFileInputRef = React.useRef<HTMLInputElement | null>(null);

    let _maxFileCount = maxFileCount ?? Infinity;

    function refreshFilesInInput() {
        const newFileList = new DataTransfer();
        for (let file of internalState.files.values()) {
            newFileList.items.add(file);
        }
        if (!internalFileInputRef.current) {
            throw new Error("Attempting to refresh internal files before the input element appears.");
        }
        internalFileInputRef.current.files = newFileList.files;
    }

    function dragEnterHandler() {
        setFileDropOverlayVisible(true);
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLInputElement>) {
        setFileDropOverlayVisible(false);
        return props.onDragLeave?.(e);
    }

    function dropHandler(event: React.DragEvent<HTMLInputElement>) {
        setFileDropOverlayVisible(false);
        return props.onDrop?.(event);
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const filesInInput = event.currentTarget.files;
        if (filesInInput) {
            for (let file of filesInInput) {
                if (internalState.files.size >= _maxFileCount) {
                    break;
                }
                internalState.files.set(v4(), file);
            }
        }
        refreshFilesInInput();
        // You'll need to update the files attribute early so that the
        // onChange event handler works with the new file values.
        setInternalState({
            files: internalState.files
        });
        return props.onChange?.(event);
    }
    function removeFile(id: string) {
        internalState.files.delete(id);
        if (internalFileInputRef.current) {
            // We're not adding any files, so we'll simply empty the file list.
            internalFileInputRef.current.files = null;
            // This calls the changeHandler file.
            internalFileInputRef.current?.dispatchEvent(new Event("change"));
        }
    }

    return <div className={`${classes.fileInputContainer}`} onDragEnter={dragEnterHandler}>
        <div
            className={`${classes.fileDropOverlay} ${fileDropOverlayVisible ? classes.fileDropOverlayVisible : ""}`}>
            Drop here to upload
        </div>
        <input type={"file"} multiple {...inputProps}
               className={`${classes.fileInput} ${fileDropOverlayVisible ? classes.fileInputVisible : ""}`}
               onDragLeave={dragLeaveHandler} onDrop={dropHandler}
               onChange={changeHandler} ref={(e) => {
            if (typeof ref === "function") {
                ref(e);
            } else if (ref) {
                ref.current = e;
            }
            internalFileInputRef.current = e;
        }}/>
        <div className={classes.inputRow}>
            <Button className={classes.inputButton} gradient={true} onClick={() => {
                internalFileInputRef.current?.click();
            }}>{buttonLabel ?? "Add file"}</Button>
            {_maxFileCount !== Infinity
                ? <span className={classes.fileCount}>{internalState.files.size}/{maxFileCount} files uploaded</span>
                : <span className={classes.fileCount}>{internalState.files.size} files uploaded</span>}
        </div>
    </div>;
});

export default MultiFileInput;