import { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useForm, SubmitHandler } from 'react-hook-form';

import xmark from '@/icons/xmark.svg';
import api from '@/helpers/api';
import classes from './styles.module.css';
import { PostContext } from '@/contexts/postContext';
import { ModalContext } from '@/contexts/modalContext';

type EditPostModalProps = {
    id: string,
    onClose: () => void;
};

type IFormInput = {
    title: String;
    content: String;
}

export default function EditPostModal(props: EditPostModalProps) {
    const [isFadeOut, updateFadeOut] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        content: ''
    });
    const { register, handleSubmit, reset } = useForm<IFormInput>({
        defaultValues: formValues
    });
    const { setPost, setPosts } = useContext(PostContext);
    const { setEditPostOpen } = useContext(ModalContext);
    const { id } = props;

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        let res;
        res = await api.put(`/api/posts/${id}`, {
            title: data.title,
            content: data.content
        });
        setPost(res.data.data);
        res = await api.get('/api/posts/');
        setPosts(res.data.data);
        setEditPostOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/posts/${id}`);
            setFormValues({
                title: res.data.data.title,
                content: res.data.data.content
            });
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

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
                        Edit a Post
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
                        <button type="submit" className={classes.createButton}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
