import React from 'react';
import classes from './styles.module.css';
import MainSidebar from '@/components/layout/MainSidebar';

export default function MainLayout(props: React.PropsWithChildren) {
    return (
        <div className={ classes.container }>
            <MainSidebar></MainSidebar>
        </div>
    );
}
