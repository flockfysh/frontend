import { useState } from 'react';
import Login from '@/components/login';

import CreateDatasetModal from '@/components/createDatasetModal';

import classes from '../styles/index.module.css';

export default function Home() {

    return (
        <>
            <h1>Homepage</h1>

            {/* <Login mode="login" /> */}
            <CreateDatasetModal />
        </>
    );
}
