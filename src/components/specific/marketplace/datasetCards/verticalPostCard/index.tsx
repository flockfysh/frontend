import { useState, useEffect } from 'react';
import Link from 'next/link';

import ProfileCard from '../../profileCard';

import api from '@/helpers/api';

import classes from './styles.module.css';

export default function VerticalPostCard(props: HomepagePost) {
    const [likeCount, setLikeCounts] = useState(0);
    const [author, setAuthor] = useState({
        fullname: '',
        username: '',
    });

    const id = props._id;
    const user = props.user;

    const gradientFunction = () => {
        const gradients = ['#92A1C6', '#146A7C'];
        return gradients[Math.round(Math.random() * 1)];
    };

    const gradientFunction2 = () => {
        const gradients = ['#F0AB3D', '#C271B4', '#C20D90'];
        return gradients[Math.round(Math.random() * 2)];
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/posts/${id}/likes/count`);
            setLikeCounts(res.data.data);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/${user}`);
            setAuthor({
                fullname: res.data.data.fullName,
                username: res.data.data.username,
            });
        };
        fetchData();
    }, [user]);

    return (
        <div className={ classes.container }>
            <div
                className={ classes.thumbnail }
                style={ {
                    background:
                        'linear-gradient(' +
                        Math.round(Math.random() * 360) +
                        'deg, ' +
                        gradientFunction() +
                        ' ' +
                        Math.round(Math.random() * 30) +
                        '%,' +
                        gradientFunction2() +
                        ' ' +
                        Math.round(Math.random() * 35 + 70) +
                        '%)',
                } }
            />

            <div className={ classes.contentContainer }>
                <div className={ classes.header }>
                    <img
                        src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Avatar"
                    />
                </div>
                <Link
                    className={ classes.linkOverlay }
                    href={ `/posts/${props._id}` }
                />
                <div className={ classes.middleSection }>
                    <h1>{ props.title }</h1>

                    <div className={ classes.footer }>
                        <div className={ classes.infoContainer }>
                            <p className={ classes.infoHeader }>Likes</p>
                            <p className={ classes.info }>{ likeCount }</p>
                        </div>

                        <div className={ classes.profileCardContainer }>
                            <ProfileCard
                                className={ classes.profileCard }
                                username={ author.username }
                                showMenu={ false }
                                isPostCard={ true }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
