import React from "react";
import classes from "./fileInput.module.css";

interface FileInputProps extends React.ComponentPropsWithRef<"input"> {
    classNames?: {};
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(function FileInput(props, ref) {
    const {classNames, ...inputProps} = props;
    const [fileDropOverlayVisible, setFileDropOverlayVisible] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const internalFileInputRef = React.useRef<HTMLInputElement | null>();
    const testFormRef = React.useRef<HTMLFormElement | null>();

    function dragEnterHandler(event: React.SyntheticEvent) {
        setFileDropOverlayVisible(true);
    }

    function dragLeaveHandler(event: React.SyntheticEvent) {
        setFileDropOverlayVisible(false);
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const newFiles = event.currentTarget.files || [];
    }

    return <div className={`${classes.fileInputContainer}`}>
        <div
            className={`${classes.fileDropOverlay} ${fileDropOverlayVisible ? classes.fileDropOverlayVisible : ""}`}></div>
        <input type={"file"} multiple name={"testFile"} {...inputProps} className={`${classes.fileInput}`}
               onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDrop={dragLeaveHandler}
               onChange={changeHandler}/>
        <button type={"button"} onClick={() => {
            if (testFormRef.current) {
                const fd = new FormData(testFormRef.current);
                console.log(fd.get("testFile"));
            }
        }}>Test
        </button>
    </div>;
});

export default FileInput;