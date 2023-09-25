import { useState, useEffect, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import { UserContext } from '@/contexts/userContext';
import EditPostModal from '@/components/specific/marketplace/editPostModal';

import { PostContext } from '@/contexts/postContext';
import { ModalContext } from '@/contexts/modalContext';
import { RandomGradientComponent } from '@/helpers/gradients';

import api from '@/helpers/api';

import cpu from '@/icons/main/cpu.svg';

import classes from './styles.module.css';
import Avatar from 'boring-avatars';

function PostItems() {
    const router = useRouter();
    const [postData, setPostData] = useState<HomepagePost>({
        _id: '',
        title: '',
        content: '',
        user: '',
    });
    const [liked, setLike] = useState(false);
    const [likeCounts, setLikeCounts] = useState(0);
    const [author, setAuthor] = useState({
        fullname: '',
        username: '',
    });
    const { user } = useContext(UserContext);
    const { post, setPost } = useContext(PostContext);
    const { isEditPostOpen, setEditPostOpen } = useContext(ModalContext);

    const postId = router.query.id;
    const userId = user?._id;

    useEffect(() => {
        const fetchDate = async () => {
            if (typeof postId !== 'string') return;

            const result = (
                await api.get<Api.Response<HomepagePost>>(
                    `/api/posts/${postId}`
                )
            ).data.data;
            setPost(result);
            setPostData(result);
        };

        fetchDate();
    }, [postId, setPost]);

    useEffect(() => {
        setPostData({
            _id: post._id,
            title: post.title,
            content: post.content,
            user: post.user,
        });
    }, [post]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/posts/${postId}/likes/count`);
            setLikeCounts(res.data.data);
        };

        fetchData();
    }, [postId]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/posts/${postId}/likes`);
            setLike(res.data.data);
        };

        fetchData();
    }, [postId]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/${post.user}`);
            setAuthor({
                fullname: res.data.data.fullName,
                username: res.data.data.username,
            });
        };
        fetchData();
    }, [post]);

    if (!postData || typeof postId !== 'string') return <></>;
    const cols = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'];
    
    return (
        <MarketplaceLayout>
            <div className={ classes.container }>
                { isEditPostOpen && (
                    <EditPostModal
                        id={ postId }
                        onClose={ () => setEditPostOpen(false) }
                    />
                ) }
                <header className={ classes.headerWrapper }>
                    { /* image */ }
                    <div className={ classes.imageWrapper }>
                        <RandomGradientComponent className= { classes.headerImage }/>

                        <div className={ classes.imageTag }>
                            <ReactSVG
                                className={ classes.imageTagIcon }
                                src={ cpu.src }
                            />

                            <div className={ classes.imageTagSeparator } />

                            <span className={ classes.imageTagText }>POST</span>
                        </div>
                    </div>

                    { /* basic info */ }
                    <div className={ classes.dataContainer }>
                        { /* first row */ }
                        <div className={ classes.actionButtonsAndImageWrapper }>
                            <div className={ classes.datasetImageWrapper }>
                                <div className={ classes.datasetImageContainer }>
                                    <div className= { classes.datasetImage }>
                                        <Avatar
                                            name= { post.title }
                                            size= { 150 }
                                            square = { true }
                                            variant = { cols[post.title.length % cols.length] } 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={ classes.dataActionButtons }>
                                <div className={ classes.basicActionsWrapper }>
                                    <button
                                        className={ classes.downloadButton }
                                        onClick={ async () => {
                                            setLike(!liked);
                                            if (!liked) {
                                                await api.post(
                                                    `/api/posts/${postId}/likes`
                                                );
                                                const res = await api.get(
                                                    `/api/posts/${postId}/likes/count`
                                                );
                                                setLikeCounts(res.data.data);
                                                setLike(true);
                                            }
 else {
                                                await api.delete(
                                                    `/api/posts/${postId}/likes`
                                                );
                                                const res = await api.get(
                                                    `/api/posts/${postId}/likes/count`
                                                );
                                                setLikeCounts(res.data.data);
                                                setLike(false);
                                            }
                                        } }
                                    >
                                        <span>{ liked ? 'Unlike' : 'Like' }</span>
                                        <span>{ likeCounts }</span>
                                    </button>
                                    { postData.user === userId && (
                                        <>
                                            <button
                                                className={
                                                    classes.downloadButton
                                                }
                                                onClick={ async () => {
                                                    await api.delete(
                                                        `/api/posts/${postId}`
                                                    );
                                                    router.push('/marketplace');
                                                } }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={
                                                    classes.downloadButton
                                                }
                                                onClick={ () =>
                                                    setEditPostOpen(true)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </>
                                    ) }
                                </div>
                            </div>
                        </div>
                        <h2 className={ classes.name }> <b> { postData.title }</b> </h2>
                        <Link
                            href={ `/profile/${author.username}` }
                            target="_blank"
                            className={ classes.username }
                        >
                            Author: @{ author.fullname }
                        </Link>
                        <br/>
                        <div className= { classes.linebreak } > 
                            { postData.content } 
                        </div>
                    </div>
                </header>
            </div>
        </MarketplaceLayout>
    );
}

export default PostItems;
