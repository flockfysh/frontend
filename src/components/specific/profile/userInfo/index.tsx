import { useContext, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from 'boring-avatars';

import { UserContext } from '@/contexts/userContext';

import api from '@/helpers/api';

import github from '@/icons/main/github.svg';
import linkedIn from '@/icons/main/linkedin.svg';
import twitter from '@/icons/main/twitter.svg';
import link from '@/icons/main/link.svg';
import pen from '@/icons/main/pen-tool.svg';
import plus from '@/icons/main/plus-circle.svg';

import classes from './styles.module.css';

function Header(props: { url: string; editable: boolean }) {
    const gradientFunction = () => {
        const gradients = ['#92A1C6', '#146A7C'];
        return gradients[Math.round(Math.random() * 1)];
    };

    const gradientFunction2 = () => {
        const gradients = ['#F0AB3D', '#C271B4', '#C20D90'];
        return gradients[Math.round(Math.random() * 2)];
    };
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={ classes.headerPictureContainer }>
            <div className={ classes.headerPictureSubContainer }>
                {
                    props.url
                        ? (
                            <Image
                                alt="banner"
                                className={ classes.headPic }
                                src={
                                    props.url
                                }
                                fill={ true }
                            />
                        )
                        : (
                            <div
                                className={ classes.defaultBanner }
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
                        )
                }
            </div>

            { props.editable ? (
                <>
                    <input
                        type="file"
                        ref={ inputRef }
                        className={ classes.hiddenPhotoChange }
                        onChange={ async (e) => {
                            if (e.currentTarget.files) {
                                const fd = new FormData();
                                
                                fd.append('image', e.currentTarget.files[0]);
                                e.currentTarget.value = '';

                                await api.put('/api/users/headerPhoto', fd);

                                router.reload();
                            }
                        } }
                    />

                    <button
                        className={ classes.photoChangeButton }
                        onClick={ () => {
                            inputRef.current?.click();
                        } }
                    >
                        <ReactSVG src={ pen.src }></ReactSVG>
                    </button>
                </>
            ) : (
                <></>
            ) }
        </div>
    );
}

function ProfilePhoto(props: { url: string; editable: boolean; username: string }) {
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={ classes.profilePictureContainer }>
            {
                props.url
                    ? (
                        <img
                            className={ classes.profilePic }
                            src={ props.url }
                            alt="profile pic"
                        />
                    )
                    : (
                        <div className={ classes.defaultProfilePic }>
                            <Avatar
                                size="12rem"
                                name={ props.username }
                                variant="marble"
                                colors={ [
                                    '#92A1C6',
                                    '#146A7C',
                                    '#F0AB3D',
                                    '#C271B4',
                                    '#C20D90',
                                ] }
                            />
                        </div>
                    )
            }

            { props.editable ? (
                <>
                    <input
                        type="file"
                        className={ classes.hiddenPhotoChange }
                        onChange={ async (e) => {
                            if (e.currentTarget.files) {
                                const fd = new FormData();

                                fd.append('image', e.currentTarget.files[0]);
                                e.currentTarget.value = '';

                                await api.put('/api/users/profilePhoto', fd);
                                
                                router.reload();
                            }
                        } }
                        ref={ inputRef }
                    />
                    <button
                        className={ classes.photoChangeButton }
                        onClick={ () => inputRef.current?.click() }
                    >
                        <ReactSVG src={ pen.src }></ReactSVG>
                    </button>
                </>
            ) : (
                <></>
            ) }
        </div>
    );
}

const UserInfo = (
    props: ProfilePageUser & {
        updateTab: (index: number) => void;
        curTab: number;
    }
) => {

    const [linkValues, setLinkValues] = useState({
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        website: 'https://website.com'
    });
    const [followers, setFollowers] = useState();
    const [followings, setFollowings] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const { user } = useContext(UserContext);
    const router = useRouter();
    const following = router.query.username;
    const editable = user?._id === props._id;


    const [userNavbarStats, setUserNavbarStats] = useState({
        numDatasets: 0,
        memberSince: "",
        lastSeen: "",
        numContributions: 0,
    });


    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/byUsername/${following}/links`);
            setLinkValues(res.data.data);
        };

        fetchData();
    }, [following]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/byUsername/${following}/followers`);
            setFollowers(res.data.data);
        };

        fetchData();
    }, [following]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/byUsername/${following}/followings`);
            setFollowings(res.data.data);
        };
        fetchData();
    }, [following]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/users/byUsername/${following}/isFollowing`);
            setIsFollowing(res.data.data);
        };

        fetchData();
    }, [following]);


    useEffect(() => {
        const fetchData = async () => {
            const numPRs = await api.get(`/api/pullRequests/user/${props._id}`)
            
            const numDs = await api.get(`/api/datasets/counts/${props._id}`)



            setUserNavbarStats({...userNavbarStats, 
                numDatasets: numDs.data.data.data, 
                numContributions: numPRs.data.data.length,
                memberSince: props.signupDate ? new Date(Date.parse(props.signupDate)).toDateString() : new Date(Date.now()).toDateString(),
                lastSeen: props.lastVisited ? new Date(Date.parse(props.lastVisited)).toDateString() : new Date(Date.now()).toDateString(),
                
            })
        };

        fetchData()
    }, [props]);


    return (
        <section>
            <div className={ classes.profileDiv }>
                <Header
                    url={ props.headerPhoto?.url ?? '' }
                    editable={ editable }
                />

                <ProfilePhoto
                    url={ props.profilePhoto?.url ?? '' }
                    editable={ editable }
                    username={ props.username }
                />

                <div className={ classes.followDiv }>
                    <p className={ classes.followers }>
                        <span className={ classes.span }>{ (followings ?? []).length }</span> following
                    </p>
                    
                    <p className={ classes.followers }>
                        <span className={ classes.span }>{ (followers ?? []).length }</span> followers
                    </p>

                    {user?._id != props._id && <button
                        className={ classes.followButton }
                        onClick={ async () => {
                            let res;
                            if (isFollowing) {
                                res = await api.put(`/api/users/byUsername/${following}/unfollow`);
                                setIsFollowing(false);
                                setFollowers(res.data.data);
                            }
                            else {
                                res = await api.put(`/api/users/byUsername/${following}/follow`);
                                setIsFollowing(true);
                                setFollowers(res.data.data);
                            }
                        } }
                    >
                        <span>{ isFollowing ? 'Following' : 'Follow' }</span>
                        <ReactSVG
                            className={ classes.imageTagIcon }
                            src={ plus.src }
                        />

                    </button>}

                </div>
            </div>

            <h4 className={ classes.name }>{ props.fullName }</h4>
            <h5 className={ classes.username }>@{ props.username }</h5>

            <div className={ classes.contentDiv }>
                <div className={ classes.socioContentDiv }>
                    <h6 className={ classes.description }>{ '' }</h6>

                    <div className={ classes.socialsDiv }>
                        <a
                            className={ classes.link }
                            href={ linkValues?.website || 'https://user.com' }
                            target="_blank"
                        >
                            <ReactSVG
                                src={ link.src }
                                className={ classes.icons }
                            />
                        </a>

                        <a
                            className={ classes.link }
                            href={ linkValues?.github || 'https://github.com' }
                            target='_blank'
                        >
                            <ReactSVG
                                src={ github.src }
                                className={ classes.icons }
                            />
                        </a>

                        <a
                            className={ classes.link }
                            href={ linkValues?.linkedin || 'https://linkedin.com' }
                            target='_blank'
                        >
                            <ReactSVG
                                src={ linkedIn.src }
                                className={ classes.icons }
                            />
                        </a>

                        <a
                            className={ classes.link }
                            href={ linkValues?.twitter || 'https://twitter.com' }
                            target='_blank'
                        >
                            <ReactSVG
                                src={ twitter.src }
                                className={ classes.icons }
                            />
                        </a>
                    </div>
                </div>

                <div className={ classes.followerDiv }>
                    { /* TODO: When you click the span, show all followers you know */ }
                    <p className= {classes.followerText}> {user.bio} </p>
                    {/*<p className={ classes.followerText }>
                        Followed by
                        <Link
                            className={ classes.followingLink }
                            href="/profile/ansh"
                        >
                            @ansh
                        </Link>
                        ,
                        <Link
                            className={ classes.followingLink }
                            href="/profile/ray"
                        >
                            @ray
                        </Link>
                        , and{ ' ' }
                        <span
                            className={
                                classes.span + ' ' + classes.seeAllFollowersSpan
                            }
                        >
                            12
                        </span>{ ' ' }
                        others you follow
                    </p> 

                    <img
                        className={ classes.followerImage }
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZSUyMHNob3R8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=500&q=60"
                        alt="follower's profile pic"
                    />

                    <img
                        className={ classes.followerImage }
                        src="https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                        alt="follower's profile pic"
                    />

                    <img
                        className={ classes.followerImage }
                        src="https://images.unsplash.com/photo-1555922927-32479f120fbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhY2UlMjBzaG90fGVufDB8fDB8fHwy&auto=format&fit=crop&w=500&q=60"
                        alt="follower's profile pic"
                    />*/}
                </div>

                <div className={ classes.finalDiv }>
                    <div className={ classes.navDiv }>
                        <div
                            className={ `${classes.navButton} ${
                                classes.firstButton
                            } ${props.curTab === 0 ? classes.active : ''}` }
                            onClick={ () => props.updateTab(0) }
                        >
                            Datasets
                        </div>

                        <div
                            className={ `${classes.navButton} ${
                                user!.username === props.username
                                    ? ''
                                    : classes.lastButton
                            } ${props.curTab === 1 ? classes.active : ''}` }
                            onClick={ () => props.updateTab(1) }
                        >
                            Activity
                        </div>

                        { user!.username === props.username && (
                            <div
                                className={ `${classes.navButton} ${
                                    classes.lastButton
                                } ${props.curTab === 2 ? classes.active : ''}` }
                                onClick={ () => props.updateTab(2) }
                            >
                                Settings
                            </div>
                        ) }
                    </div>

                    <div className={ classes.statsDiv }>
                        <p className={ classes.userStats }>
                            <span className={ classes.span }> {userNavbarStats.numDatasets} </span>
                            <br /> Datasets
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }>{userNavbarStats.memberSince}</span>
                            <br /> Member Since
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }> {userNavbarStats.lastSeen}</span>
                            <br /> Last Seen
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }> {userNavbarStats.numContributions != undefined ? userNavbarStats.numContributions : "ooga booga"} </span>
                            <br /> Contributions
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInfo;
