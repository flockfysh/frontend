import { useContext, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, SubmitHandler } from 'react-hook-form';

import { PostContext } from '@/contexts/postContext';
import { ModalContext } from '@/contexts/modalContext';

import api from '@/helpers/api';

import xmark from '@/icons/xmark.svg';

import classes from './styles.module.css';

type CreatePostModalProps = {
    onClose: () => void;
};

type IFormInput = {
    title: String;
    content: String;
};

export default function CreatePostModal(props: CreatePostModalProps) {
    const [isFadeOut, updateFadeOut] = useState(false);
    const { register, handleSubmit } = useForm<IFormInput>();
    const { setPosts } = useContext(PostContext);
    const { setCreatePostOpen } = useContext(ModalContext);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await api.post('/api/posts/', {
            title: data.title,
            content: data.content,
        });
        const res = await api.get('/api/posts/');

        setPosts(res.data.data);
        setCreatePostOpen(false);
    };

    return (
        <div
            className={ `${classes.overlay} ${classes.blurBg} ${
                isFadeOut ? classes.fadeOut : ''
            }` }
            onClick={ (e) => {
                if (e.target === e.currentTarget) props.onClose();
            } }
            onAnimationEnd={ () => {
                if (isFadeOut) props.onClose();
            } }
        >
            <div className={ classes.container }>
                <div className={ classes.header }>
                    <h1 className={ classes.headerText }>Create an Announcement </h1>
                    <ReactSVG
                        src={ xmark.src }
                        onClick={ () => updateFadeOut(true) }
                        className={ classes.closeBtn }
                    />
                </div>

                <form
                    className={ classes.form }
                    onSubmit={ handleSubmit(onSubmit) }
                >
                    <div className={ classes.rowContainer }>
                        <label>
                            <p>Title</p>
                        
                            <input
                                { ...register('title') }
                                type="text"
                                placeholder="XYZ ..."
                                className={ classes.nameContainer }
                                required={ true }
                            />
                        </label>

                        <label>
                            <p>Content</p>
                        
                            <textarea
                                { ...register('content') }
                                placeholder="What it contains, what it is for, ..."
                                required={ true }
                            />
                        </label>
                        
                        <button type="submit" className={ classes.createButton }>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
