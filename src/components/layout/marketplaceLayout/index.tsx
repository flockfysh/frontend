import classes from './styles.module.css';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import Footer from '@/components/specific/marketplace/footer';
import { PropsWithChildren } from 'react';

export default function MarketplaceLayout(props: PropsWithChildren) {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>
            { props.children }
            <Footer/>
        </div>
    );
}
