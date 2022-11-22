import classes from "./eachDatasetOverview.module.css";

export default function EachDatasetOverview(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className={ classes.overviewContainer }>
            <div className={ classes.overviewContentContainer }>
                <h1>{ props.dataset.name } dataset</h1>

                <p>
                    { props.dataset.overview }
                </p>

                <div className={ classes.overviewInfoCards }>
                    <div>
                        Images: { props.dataset.datasetImages.length }
                    </div>

                    <div>
                        Size of Dataset: { props.dataset.size }Gb
                    </div>

                    <div>
                        Date created: { props.dataset.dateCreated }
                    </div>
                </div>

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
            </div>
        </div>
    );
}
