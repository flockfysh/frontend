import { Navigation } from 'swiper';
import classes from './styles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import prev from '@/icons/main/arrow-left.svg';
import next from '@/icons/main/arrow-right.svg';
import { ReactSVG } from 'react-svg';
import VerticalCollectionCard from '@/components/specific/marketplace/datasetCards/VerticalCollectionCard';


function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return () => setValue(value => value + 1);
}

export default function CollectionSwiper(props: {
    collections: HomepageCollection[],
    onSlideChange?: (selected: HomepageCollection) => void,
}) {
    const previousRef = React.useRef<HTMLButtonElement | null>(null);
    const nextRef = React.useRef<HTMLButtonElement | null>(null);
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        forceUpdate();
    }, [previousRef.current, nextRef.current]);

    return (
        <div className={ classes.swiperContainer }>
            <div className={ `${classes.fadeOverlay}  ${classes.previous}` }>
                <button className={ `${classes.navButton}` } ref={ previousRef }>
                    <ReactSVG src={ prev.src }></ReactSVG>
                </button>
            </div>
            <Swiper slidesPerView={ 'auto' } modules={ [Navigation] }
                    navigation={ { enabled: true, prevEl: previousRef.current, nextEl: nextRef.current } }
                    className={ classes.swiper }
                    onSlideChange={ swiper => {
                        props.onSlideChange?.(props.collections[swiper.realIndex]);
                    } }>
                {props.collections.map(collection => {
                    return (
                        <SwiperSlide className={ classes.slide } key={ collection._id }>
                            <VerticalCollectionCard
                                { ...collection }></VerticalCollectionCard></SwiperSlide>
                    );
                })}
                <div className={ classes.swiperOverlay }></div>
            </Swiper>
            <div className={ `${classes.fadeOverlay} ${classes.next}` }>
                <button className={ `${classes.navButton}` } ref={ nextRef }>
                    <ReactSVG src={ next.src }></ReactSVG>
                </button>
            </div>
        </div>
    );
}
