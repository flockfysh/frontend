import dynamic from 'next/dynamic';
import { RectangleProps } from './rectangle';

const NoSSRComponent = dynamic(() => import('./rectangle'), {
    ssr: false
});

export default function Rectangle(props: RectangleProps){
    return <NoSSRComponent { ...props } />;
}
