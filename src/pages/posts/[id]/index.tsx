import {
    useState,
    useEffect,
} from 'react';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

import api from '@/helpers/api';
import MarketplaceLayout from '@/components/layout/marketplaceLayout';
import cpu from '@/icons/main/cpu.svg';
import flag from '@/icons/main/flag.svg';
import classes from './styles.module.css';


const PostItems = function () {
    const router = useRouter();
    const [post, setPost] = useState<HomepagePost | undefined>();
    const [liked, setLike] = useState(false);
    const [likeCounts, setLikeCounts] = useState(0);

    const postId = router.query.id;

    useEffect(() => {
        async function load() {
            if (typeof postId !== 'string') return;

            const result = (
                await api.get<Api.Response<HomepagePost>>(
                    `/api/posts/${postId}`
                )
            ).data.data;

            setPost(result);
        }

        load().then();
    }, [postId]);

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

    if (!post || typeof postId !== 'string') return <></>;
    return (
        <MarketplaceLayout>
            <div className={ classes.container }>
            <header className={ classes.headerWrapper }>
                { /* image */ }
                <div className={ classes.imageWrapper }>
                    <img
                        className={ classes.headerImage }
                        src={
                            'https://c.pxhere.com/photos/0d/b1/photo-168471.jpg!d'
                        }
                        alt="Datasets portrait image"
                    />

                    <div className={ classes.imageTag }>
                        <ReactSVG
                            className={ classes.imageTagIcon }
                            src={ cpu.src }
                        />

                        <div className={ classes.imageTagSeparator }/>

                        <span className={ classes.imageTagText }>
                            { "POST" }
                        </span>
                    </div>
                </div>

                { /* basic info */ }
                <div className={ classes.dataContainer }>
                    { /* first row */ }
                    <div className={ classes.actionButtonsAndImageWrapper }>
                        <div className={ classes.datasetImageWrapper }>
                            <div className={ classes.datasetImageContainer }>
                                <img
                                    className={ classes.datasetImage }
                                    src={
                                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fcar-vehicle-martini-sports-car-race-car-supercar-team-racing-race-track-porsche-motorsport-leicam-summilux50f14-typ240-supercup-sebastianloeb-gt3r-louwmanmuseum-land-vehicle-auto-racing-automobile-make-automotive-design-performance-car-stock-car-racing-porsche-911-gt3-porsche-911-gt2-236174.jpg&f=1&nofb=1&ipt=1806d4f590c10c3f085ed81b7b35d359fb70e4d85672c00eb29e2eacf4b63453&ipo=images'
                                    }
                                    alt="Datasets Image"
                                />
                            </div>
                        </div>

                        <div className={ classes.dataActionButtons }>
                            <div className={ classes.basicActionsWrapper }>
                                <button className={ classes.basicButton }>
                                    <ReactSVG
                                        className={ classes.imageTagIcon }
                                        src={ flag.src }
                                    />
                                </button>
                                <button
                                    className={ classes.downloadButton}
                                    onClick={ async () => {
                                        setLike(!liked);
                                        if (!liked) {
                                            await api.post(`/api/posts/${postId}/likes`);
                                            const res = await api.get(`/api/posts/${postId}/likes/count`);
                                            setLikeCounts(res.data.data);
                                            setLike(true);
                                        }
                                        else {
                                            await api.delete(`/api/posts/${postId}/likes`);
                                            const res = await api.get(`/api/posts/${postId}/likes/count`);
                                            setLikeCounts(res.data.data);
                                            setLike(false);
                                        }
                                    }}
                                >
                                    <span>{ liked ? 'Unlike' : 'Like' }</span>
                                    <span>{ likeCounts }</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        </MarketplaceLayout>
    );
};

export default PostItems;
