import React from 'react';
import Modal, {FilePreview} from '../../modal/modal';
import Button from "../../button/button";
import FillableSVG from "../../image/fillableSVG/fillableSVG";
import classes from './fileItemCard.module.css';
import closeSVG from "../../../../images/icons/close.svg";
import fileSVG from "../../../../images/icons/file.svg";
import mimeChecker from "../../../../helpers/mimeChecker";

type FileItemProps = {
    id: string;
    file: File;
    index: number;
    removeFile: (id: string) => void;
};

export default function FileItemCard(props: FileItemProps) {
    const [imageUrl, setImageUrl] = React.useState("");
    const [previewShown, setPreviewShown] = React.useState(false);
    React.useEffect(() => {
        if (mimeChecker(props.file.type, "image/*")) {
            const imageUrl = URL.createObjectURL(props.file);
            setImageUrl(imageUrl);
            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        } else {
            setImageUrl("");
        }
    }, [props.file]);

    function displayImage() {
        setPreviewShown(true);
    }

    function closeModal() {
        setPreviewShown(false);
    }

    return <div className={classes.fileItemCard}>
        {
            previewShown ? <FilePreview file={props.file} closeModal={closeModal}/> : null
        }
        {imageUrl ?
            <img src={imageUrl} alt={props.file.name} className={classes.smallPreview}/> :
            <FillableSVG src={fileSVG} className={`${classes.smallPreview} ${classes.placeholderFile}`}></FillableSVG>}
        <h3 className={classes.fileItemName}>{props.file.name}</h3>
        <Button className={classes.viewImage} onClick={displayImage}>Preview</Button>
        <Button
            onClick={
                () => props.removeFile(props.id)
            }
            className={classes.deleteUpload}>
            <FillableSVG src={closeSVG} className={classes.deleteUploadSVG}/>
        </Button>
    </div>;
}
