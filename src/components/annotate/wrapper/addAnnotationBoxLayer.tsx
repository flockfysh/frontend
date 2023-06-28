import dynamic from 'next/dynamic';

const NoSSRComponent = dynamic(() => import('./addAnnotationBoxLayerCode'), {
    ssr: false
});

export default function AddAnnotationBoxLayer(
    props: {
        width: number,
        height: number,
        onAdd?: (normalizedCoordinates: AnnotationBox) => void;
    }) {

    return <NoSSRComponent { ...props } />;
}
