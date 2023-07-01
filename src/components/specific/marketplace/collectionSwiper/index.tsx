import { useRef } from 'react';
import { ReactSVG } from 'react-svg';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import VerticalCollectionCard from '@/components/specific/marketplace/datasetCards/verticalCollectionCard';

// import useForceUpdate from '@/helpers/useForceUpdate';

import prev from '@/icons/main/arrow-left.svg';
import next from '@/icons/main/arrow-right.svg';

import classes from './styles.module.css';

export default function CollectionSwiper(props: {
    collections: HomepageCollection[];
    onSlideChange?: (selected: HomepageCollection) => void;
}) {
    const previousRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    // const forceUpdate = useForceUpdate();

    // useEffect(() => {
    //     forceUpdate();
    // }, []);

    return (
        <div className={classes.swiperContainer}>
            <div className={`${classes.fadeOverlay} ${classes.previous}`}>
                <button className={`${classes.navButton}`} ref={previousRef}>
                    <ReactSVG src={prev.src} />
                </button>
            </div>

            <Swiper
                slidesPerView="auto"
                modules={[Navigation]}
                navigation={{
                    enabled: true,
                    prevEl: previousRef.current,
                    nextEl: nextRef.current,
                }}
                className={classes.swiper}
                onSlideChange={(swiper) => {
                    props.onSlideChange?.(props.collections[swiper.realIndex]);
                }}
            >
                {props.collections.map((collection) => {
                    return (
                        <SwiperSlide
                            className={classes.slide}
                            key={collection._id}
                        >
                            <VerticalCollectionCard {...collection} />
                        </SwiperSlide>
                    );
                })}

                <div className={classes.swiperOverlay} />
            </Swiper>

            <div className={`${classes.fadeOverlay} ${classes.next}`}>
                <button className={`${classes.navButton}`} ref={nextRef}>
                    <ReactSVG src={next.src} />
                </button>
            </div>
        </div>
    );
}
