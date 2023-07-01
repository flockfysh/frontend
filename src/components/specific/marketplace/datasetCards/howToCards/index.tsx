import { ReactSVG } from 'react-svg';

import user from '@/icons/base/user.svg';
import users from '@/icons/base/users.svg';
import upload from '@/icons/base/upload.svg';

import classes from './styles.module.css';

export default function HowToCards() {
    return (
        <div className={ classes.container }>
            <div className={ classes.card }>
                <ReactSVG className={ classes.headerIcon } src={ user.src }/>

                <div className={ classes.cardBase }>
                    <h1>Buy and Sell AI</h1>

                    <p> From buy, renting, to selling AI models and datasets on your terms, easily earn recurring
                        revenue while advancing AI. </p>
                </div>
            </div>

            <div className={ classes.card }>
                <ReactSVG className={ classes.headerIcon + ' ' + classes.noBorder } src={ upload.src }/>

                <div className={ classes.cardBase }>
                    <h1> Ethically build and QA large datasets</h1>

                    <p> Directly interact with those who provide the data and obtain anonymized, risk free data.
                        Seamless run workflows that ensure your data is top notch, while easily finding QA experts. </p>
                </div>
            </div>


            <div className={ classes.card }>
                <ReactSVG className={ classes.headerIcon + ' ' + classes.noBorder } src={ users.src }/>

                <div className={ classes.cardBase }>
                    <h1>Collaborate</h1>

                    <p> Work together to build some awesome AI services and use flockfysh&apos;s platform as a stepping
                        stone to commercialize your venture or directly support the open source community.</p>
                </div>
            </div>
        </div>
    );
}
