import { useState, useRef, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import VerticalCard from '@/components/specific/marketplace/datasetCards/verticalCard';
import WideFocusedCard from '@/components/specific/marketplace/datasetCards/wideFocusedCard';

import useForceUpdate from '@/helpers/useForceUpdate';

import prev from '@/icons/main/arrow-left.svg';
import next from '@/icons/main/arrow-right.svg';

import classes from './styles.module.css';

export default function DatasetSwiper(props: {
    datasets: HomepageDataset[],
    cardType: 'wide' | 'vertical',
    centeredSlides?: boolean,
    onSlideChange?: (selected: HomepageDataset) => void,
}) {
    const previousRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        forceUpdate();
    }, [previousRef.current, nextRef.current]);

    return (
        <div className={ classes.swiperContainer }>
            <div className={ `${ classes.fadeOverlay }  ${ classes.previous }` }>
                <button className={ `${ classes.navButton }` } ref={ previousRef }>
                    <ReactSVG src={ prev.src } />
                </button>
            </div>

            <Swiper
                slidesPerView="auto"
                modules={ [Navigation] }
                navigation={ { enabled: true, prevEl: previousRef.current, nextEl: nextRef.current } }
                className={ classes.swiper }
                centeredSlides={ props.centeredSlides }
                onSlideChange={ swiper => props.onSlideChange?.(props.datasets[swiper.realIndex]) }
            >
                {
                    props.datasets.map(dataset => {
                        if (props.cardType === 'wide')
                            return (
                                <SwiperSlide className={ `${ classes.slide } ${ classes.wideSlide }` } key={ dataset._id }>
                                    <WideFocusedCard
                                        name={ dataset.name }
                                        owner={ dataset.user.username }
                                        numItems={ dataset.assetCounts.total }
                                        size={ dataset.size.total.total }
                                        type={ dataset.type }
                                    />
                                </SwiperSlide>
                            );

                        return (
                            <SwiperSlide className={ classes.slide } key={ dataset._id }>
                                <VerticalCard
                                    coverImg="https://s3-alpha-sig.figma.com/img/36d3/317f/582a6d12a1ac0a8500a57849890709e4?Expires=1686528000&Signature=mo5GbNolcXaqpR5ZMmzGlil-0ZtkdrCumHKZGKrkq05AvARym-bbdtv720fbDLvK2LIGdCbdBu~Ym8hi~Ll3rR8x43~c78cU5N9U0QvZSzVtdDoEZZEYNw8FOaPebHvt8qnPKudLnm1rzysRrZxYdeW~PbajEGKy-sZ5u89cIOj-0cFUqtJAr~2V-6PgoLo3KoA1GM7mYuLzhW5MJrH9nHLmBPhyMw9J6fMVEti5WxdDPGdS7T2e9sM7HVQFILd-IJ131uMHmqMsNw~POWdZkYmK7bBailScn92Pc4WGPrYcuc1w1rhnqYqtgBcPq3G-QOdAMO9BOSQ64Gj2hNDtSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                    name={ dataset.name }
                                    owner={ dataset.user.username }
                                    updatedAt={ dataset.updatedAt }
                                    numItems={ dataset.assetCounts.total }
                                    size={ dataset.size.total.total }
                                    type={ dataset.type }
                                    isPaid={ !!dataset.price }
                                    price={ dataset.price }
                                />
                            </SwiperSlide>
                        );
                    })
                }

                <div className={ classes.swiperOverlay } />
            </Swiper>

            <div className={ `${ classes.fadeOverlay } ${ classes.next }` }>
                <button className={ `${ classes.navButton }` } ref={ nextRef }>
                    <ReactSVG src={ next.src } />
                </button>
            </div>
        </div>
    );
}
