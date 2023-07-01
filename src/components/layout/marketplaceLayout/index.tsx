import classes from './styles.module.css';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import Footer from '@/components/specific/marketplace/footer';
import { PropsWithChildren } from 'react';
import MainLayout from '@/components/layout/mainLayout';

export default function MarketplaceLayout(props: PropsWithChildren) {
    return (
        <MainLayout>
            <div className={ classes.container }>
                <MarketplaceNavbar/>
                { props.children }
                <Footer/>
            </div>
        </MainLayout>
    );
}
