import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import Button from '../../components/UI/button/button';
import CustomSelect from '../../components/UI/input/selectInput';
import Loading from '../../components/loading/loading';
import { formToJSON } from 'axios';
import Logout from '../../components/account/logout';
import classes from './profile.module.css';
import api from '../../helpers/api';
import * as url from 'url';

export default function Profile() {
    const { curUser } = useContext(UserContext);
    const [isPaying, setIsPaying] = useState(false);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    if (!curUser) return <Loading/>;

    // ! Temporary until backend returns a monthly cost object
    curUser.monthlyCost = {
        storage: 0,
        creation: 0,
        total: 0,
        costs: [],
    };


    function handleSelectChange(newValue: unknown, actionMeta: any) {
        const val = newValue as { label: string, value: string };
        const testSubType = 'free';
        setIsPaying(val.value !== testSubType);
    }

    async function createSubscription() {
        const form = formRef.current;
        if (form) {
            const response = await api.post<{
                success: boolean,
                data: string,
            }>('/api/payments/createUserSubscriptionUrl', formToJSON(form));
            const url = response.data.data;
            location.replace(url);
        }
    }

    return (
        <div className={ classes.containerDiv }>
            <div className={ classes.imageSection }>
                <div className={ classes.headingRow }>
                    <h3 className={ classes.heading }>Your Account</h3>

                    <Logout/>
                </div>

                <div className={ classes.subHeadingContainer }>
                    <div className={ classes.nameDiv }>
                        <img className={ classes.image } src={ curUser.profileImage } alt={ curUser.name }/>

                        <div className={ classes.infoDiv }>
                            <h4 className={ classes.name }>{curUser.name}</h4>

                            <h6 className={ classes.email }>{curUser.email}</h6>
                        </div>
                    </div>

                    <form className={ classes.payingPlanContainer } ref={ formRef } onSubmit={ e => {
                        e.preventDefault();
                        createSubscription().then();
                    } }>
                        <h3>Your Subscription</h3>

                        <CustomSelect
                            id="pricingPlan"
                            name="tier"
                            className={ classes.pricePlanSelect }
                            required={ true }
                            options={ [
                                { label: 'Free forever', value: 'free' },
                                { label: 'Professional', value: 'professional' },
                                { label: 'Enterprise', value: 'enterprise' },
                            ] }
                            isSearchable={ false }
                            onChange={ handleSelectChange }
                        />

                        {isPaying && <Button gradient type={ 'submit' } className={ classes.payButton }>Pay</Button>}
                    </form>
                </div>
            </div>

            <div className={ classes.cardSection }>
                <div className={ classes.card }>
                    <h5 className={ classes.cardHeading }>
                        Total Monthly Cost <span>${curUser.monthlyCost.total}</span>
                    </h5>

                    {
                        curUser.monthlyCost.costs.length === 0 ?
                            <p className={ classes.cardText }>No costs to display</p> : (
                                curUser.monthlyCost.costs!.map(
                                    (cost, index) => (
                                        <p className={ classes.cardText } key={ index }>
                                            {cost.description} <span className={ classes.price }>${cost.amount}</span>
                                        </p>
                                    ),
                                )
                            )
                    }
                </div>

                <div className={ classes.card }>
                    <h5 className={ classes.cardHeading }>Payment History</h5>

                    {
                        curUser.payments.length === 0 ? <p className={ classes.cardText }>No payments to display</p> : (
                            curUser.payments.map(
                                (payment, index) => (
                                    <p className={ classes.cardText } key={ index }>
                                        {payment.description} {' '}
                                        <span className={ classes.price }>${payment.amount}</span>
                                    </p>
                                ),
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}
