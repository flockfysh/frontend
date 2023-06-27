import { Navigation } from 'swiper';
import classes from './styles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import VerticalCard from '@/components/specific/marketplace/datasetCards/VerticalCard';
import React from 'react';
import prev from '@/icons/main/arrow-left.svg';
import next from '@/icons/main/arrow-right.svg';
import { ReactSVG } from 'react-svg';
import WideFocusedCard from '@/components/specific/marketplace/datasetCards/WideFocusedCard';


function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return () => setValue(value => value + 1);
}

export default function DatasetSwiper(props: {
    datasets: HomepageDataset[],
    cardType: 'wide' | 'vertical',
    centeredSlides?: boolean,
    onSlideChange?: (selected: HomepageDataset) => void,
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
                    className={ classes.swiper } centeredSlides={ props.centeredSlides }
                    onSlideChange={ swiper => {
                        props.onSlideChange?.(props.datasets[swiper.realIndex]);
                    } }>
                {props.datasets.map(dataset => {
                    if (props.cardType === 'wide') {
                        return (
                            <SwiperSlide className={ `${classes.slide} ${classes.wideSlide}` } key={ dataset._id }>
                                <WideFocusedCard { ...dataset }/>
                            </SwiperSlide>
                        );
                    }
                    return (
                        <SwiperSlide className={ classes.slide } key={ dataset._id }>
                            <VerticalCard { ...dataset }/>
                        </SwiperSlide>
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
