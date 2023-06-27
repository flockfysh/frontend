import { PropsWithChildren } from 'react';
import { ReactSVG } from 'react-svg';

import svg from '@/icons/main/plus-circle.svg';
import github from '@/icons/main/github.svg';
import linkedIn from '@/icons/main/linkedin.svg';
import twitter from '@/icons/main/twitter.svg';
import link from '@/icons/main/link.svg';

import classes from './styles.module.css';

type userInfo = {
    name: string;
    userName: string;
    description: string;
    followers: number;
    following: number;
    updateTab: (_: number) => void;
} & PropsWithChildren;

const userInfo = (props: userInfo) => {
    return (
        <section>
            <img
                className={ classes.headPic }
                src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                alt="Banner Image"
            />

            <div className={ classes.profileDiv }>
                <img
                    className={ classes.profilePic }
                    src="https://images.unsplash.com/photo-1577565177023-d0f29c354b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2UlMjBzaG90fGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="profile pic"
                />

                <div className={ classes.followDiv }>
                    <p className={ classes.followers }>
                        <span className={ classes.span }>{ props.following }</span> following
                    </p>
                    <p className={ classes.followers }>
                        <span className={ classes.span }>{ props.followers }</span> followers
                    </p>

                    <button className={ classes.followButton }>
                        Edit profile <ReactSVG className={ classes.followIcon } src={ svg.src } />
                    </button>
                </div>
            </div>

            <h4 className={ classes.name }>{ props.name }</h4>

            <h5 className={ classes.username }>@{ props.userName }</h5>

            <div className={ classes.contentDiv }>
                <div className={ classes.socioContentDiv }>
                    <h6 className={ classes.description }>{ props.description }</h6>

                    <div className={ classes.socialsDiv }>
                        <a className={ classes.link } href="#">
                            <ReactSVG src={ link.src } className={ classes.icons } /> user.com
                        </a>

                        <a className={ classes.link } href="https://www.github.com">
                            <ReactSVG src={ github.src } className={ classes.icons } />
                        </a>

                        <a className={ classes.link } href="https://www.linkedin.com">
                            <ReactSVG src={ linkedIn.src } className={ classes.icons } />
                        </a>

                        <a className={ classes.link } href="https://www.twitter.com">
                            <ReactSVG src={ twitter.src } className={ classes.icons } />
                        </a>
                    </div>
                </div>

                <div className={ classes.followerDiv }>
                    <p className={ classes.followerText }>
                        Followed by @ansh,@ray and 12 others you follow
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
                    />
                </div>

                <div className={ classes.finalDiv }>
                    <div className={ classes.navDiv }>
                        <button className={ classes.navButton } onClick={ () => props.updateTab(0) }>
                            Datasets
                        </button>
                        <button className={ classes.navButton } onClick={ () => props.updateTab(1) }>
                            Activity
                        </button>
                        <button className={ classes.navButton } onClick={ () => props.updateTab(2) }>
                            Settings
                        </button>
                    </div>

                    <div className={ classes.statsDiv }>
                        <p className={ classes.userStats }>
                            <span className={ classes.span }>10</span>
                            <br /> Datasets
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }>2000</span>
                            <br /> Total Files
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }>April 2023</span>
                            <br /> Member Since
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }>June 2023</span>
                            <br /> Last Seen
                        </p>

                        <div className={ classes.dot } />

                        <p className={ classes.userStats }>
                            <span className={ classes.span }>74</span>
                            <br /> Contributions
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default userInfo;
