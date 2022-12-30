import classes from './settings.module.css';

export default function Settings(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className={ classes.settingsContainer }>
            <div className={ classes.settingsContentContainer }>
                <h1>Settings</h1>

                <div className={ classes.overviewPaymentContainer }>
                    <h1>Payment</h1>

                    <div className={ classes.overviewPaymentContent }>
                        <div className={ classes.monthlyContainer }>
                            <h2>{ months[(new Date()).getMonth()] }'s total cost: ${ props.dataset.monthlyCost.storage + props.dataset.monthlyCost.creation }</h2>

                            <p>Datset storage: ${ props.dataset.monthlyCost.storage }</p>
                            <p>Creation: ${ props.dataset.monthlyCost.creation }</p>
                        </div>

                        <div className={ classes.currentPlan }>
                            <h3>Current plan</h3>

                            <div>
                                <h2>{ props.dataset.plan }: ${ props.dataset.monthlyCost.creation }</h2>
                                <p>lorem lorem</p>
                                <p>lorem lorem</p>
                            </div>
                        </div>

                        <div className={ classes.changePlan }>
                            <h1>Change current plan</h1>

                            <select defaultValue={ props.dataset.plan }>
                                <option value="Hobbyist">Hobbyist</option>
                            </select>

                            <button>Change</button>
                        </div>
                    </div>
                </div>

                <div className={ classes.deleteButtonContainer }>
                    <button className={ classes.deleteButton }>Delete dataset</button>
                </div>
            </div>
        </div>
    );
}