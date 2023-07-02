import { PropsWithChildren } from 'react';

import HomeNavbar from '@/components/specific/home/navbar';
import Footer from '@/components/specific/marketplace/footer';

import classes from './styles.module.css';

export default function HomeLayout(props: PropsWithChildren) {
    return (
        <div className={ classes.container }>
            <HomeNavbar/>

            { props.children }
            
            <Footer />
        </div>
    );
}
