import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, SubmitHandler } from 'react-hook-form';

import xmark from '@/icons/xmark.svg';
import api from '@/helpers/api';
import classes from './styles.module.css';

type CreatePostModalProps = {
    onClose: () => void;
};

type IFormInput = {
    title: String;
    content: String;
}

export default function CreatePostModal(props: CreatePostModalProps) {
    const [isFadeOut, updateFadeOut] = useState(false);
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await api.post('/api/posts/', {
            title: data.title,
            content: data.content
        })
    }

    return (
        <div
            className={ `${classes.overlay} ${classes.blurBg} ${isFadeOut ? classes.fadeOut : ''}` }
            onClick={ (e) => {
                if (e.target === e.currentTarget) props.onClose();
            } }
            onAnimationEnd={
                () => {
                    if (isFadeOut) props.onClose();
                }
            }
        >
            <div
                className={ classes.container }
            >
                <div className={ classes.header }>
                    <h1 className={ classes.headerText }>
                        Create a Post
                    </h1>
                    <ReactSVG
                        src={ xmark.src }
                        onClick={ () => updateFadeOut(true) }
                        className={ classes.closeBtn }
                    />
                </div>

                <form
                    className={ classes.form }
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={ classes.rowContainer }>
                        <label>
                            <p>Title</p>
                            <input
                                {...register('title')}
                                type="text"
                                placeholder="XYZ ..."
                                className={ classes.nameContainer }
                                required={ true }
                            />
                        </label>
                        <label>
                            <p>Content</p>
                            <textarea
                                {...register('content')}
                                placeholder="What it contains, what it is for, ..."
                                required={ true }
                            />
                        </label>
                        <button type='submit' className={classes.createButton}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
