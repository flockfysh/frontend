import Button from "../../../UI/button/button";
import CustomSelect from "../../../UI/input/selectInput";
import classes from '../common.module.css';
import settingsClasses from './settings.module.css';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const PLAN_OPTION = [
    {value: 'hobbyist', label: "Hobbyist"},
    {value: 'professional', label: "Professional"},
];

export default function Settings(props: { dataset: Dataset }) {
    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <h1>Settings</h1>
                <section className={classes.section}>
                    <h2>Billing</h2>
                    <div className={settingsClasses.itemContainer}>
                        <div className={settingsClasses.item}>
                            <h3>Outstanding balance</h3>
                            <div className={`${settingsClasses.itemInner} ${settingsClasses.withBackground}`}>
                                <h4>
                                    {months[new Date().getMonth()]}'s total cost: $
                                    {props.dataset.monthlyCost.storage +
                                        props.dataset.monthlyCost.creation}
                                </h4>

                                <p>Dataset storage: ${props.dataset.monthlyCost.storage}</p>
                                <p>Creation: ${props.dataset.monthlyCost.creation}</p>
                            </div>
                        </div>
                        <div className={settingsClasses.item}>
                            <h3>Current plan</h3>
                            <div className={`${settingsClasses.itemInner} ${settingsClasses.withBackground}`}>
                                <h4>
                                    {props.dataset.plan}: ${props.dataset.monthlyCost.creation}
                                </h4>
                                <p>lorem lorem</p>
                                <p>lorem lorem</p>
                            </div>
                        </div>
                        <div className={settingsClasses.item}>
                            <h3>Change current plan</h3>
                            <div className={`${settingsClasses.itemWithoutBackground}`}>
                                <CustomSelect options={PLAN_OPTION} required={true}/>
                                <Button className={settingsClasses.button} gradient={true}>Change</Button>
                            </div>
                        </div>
                    </div>

                </section>
                <section className={classes.section}>
                    <h2>Dataset settings</h2>
                    <div className={settingsClasses.deleteButtonContainer}>
                        <Button className={settingsClasses.deleteButton}>Delete dataset</Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
