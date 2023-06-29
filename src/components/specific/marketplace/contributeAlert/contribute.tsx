import { useState, useRef } from 'react';

import { ReactSVG } from 'react-svg';

import FileUpload from '@/components/fileUpload/index';

import api from '@/helpers/api';

import cross from '@/icons/main/x-circle.svg';
import edit from '@/icons/main/edit-3.svg';
import database from '@/icons/main/database.svg';

import classes from './contribute.module.css';

type popup = {
    open: any;
    children?: React.ReactNode;
};

const contribute = (props: popup) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <div className={classes.container}>
            <div className={classes.headingDiv}>
                <h3 className={classes.heading}>Contribution Request</h3>
                <ReactSVG src={cross.src} className={classes.icon} />
            </div>
            <div className={classes.inputDiv}>
                <h4 className={classes.subheading}>Title</h4>
                <div className={classes.mergedInput}>
                    <ReactSVG src={edit.src} className={classes.icon} />
                    <input
                        className={classes.input}
                        type="text"
                        value={title}
                        onChange={event => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={classes.inputDiv}>
                <h4 className={classes.subheading}>Descript your request</h4>
                <div>
                    <textarea
                        className={classes.textArea}
                        placeholder="Describe what is in your contribution. Be as precise as you can"
                        onChange={event => {
                            setBody(event.target.value);
                        }}
                        value={body}
                    />
                </div>
            </div>
            <div className={classes.inputDiv}>
                <h4 className={classes.subheading}>Files</h4>
                <FileUpload
                    uploadContainerClassName={`${classes.uploadContainer}`}
                    // ref={}
                />
            </div>
            <button
                className={classes.button}
                onClick={() => {
                    props.open(false);
                }}
            >
                Submit Request
                <ReactSVG src={database.src} className={classes.icon} />
            </button>
        </div>
    );
};

export default contribute;
