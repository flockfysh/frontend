import classes from '../common.module.css';
import trainingClasses from './train.module.css';
import {RxArrowRight} from 'react-icons/rx';
import Button from '../../../UI/button/button';
import {CustomCreatableSelect} from '../../../UI/input/selectInput';
import React from 'react';
import {LABEL_COLORS} from '../../../../settings';

function TrainingLabels(props: React.ComponentPropsWithRef<'label'> & { labelColor?: string }) {
    const {labelColor, ...smallProps} = props;

    return (
        <label {...smallProps} className={`${trainingClasses.label} ${props.className || ''}`}>
            <div className={trainingClasses.labelDot} style={{
                backgroundColor: labelColor ?? LABEL_COLORS[0],
            }}></div>
            {props.children}
        </label>
    );
}

export default function Train(props: { dataset: Dataset }) {
    const submissionRef = React.useRef<HTMLFormElement | null>(null);

    function initiateSubmission() {
        const submissionForm = submissionRef.current;
        if (submissionForm) {
            const fd = new FormData(submissionForm);
            const jsonBody: any = {};

        }
    }

    return (
        <div className={classes.container}>
            <form className={classes.contentContainer} ref={submissionRef}>
                <div className={classes.titleBar}>
                    <h1>Dataset training</h1>
                    <Button type={'submit'} className={classes.utilityButton} gradient={true}>
                        <span>Initiate training</span>
                        <RxArrowRight className={classes.icon}></RxArrowRight>
                    </Button>
                </div>
                <div className={classes.formInputs}>
                    <div className={classes.labelledInputContainer}>
                        <span className={classes.labelledInputContainer__label}>Search Queries</span>
                        <ul className={trainingClasses.trainingQueriesInputs}>
                            {props.dataset.classes.map(function generateSearchQueryInput(classString, index) {
                                const id = React.useId();
                                return (<React.Fragment key={index}>
                                    <TrainingLabels htmlFor={id}
                                                    labelColor={LABEL_COLORS[index]}>{classString}</TrainingLabels>
                                    <CustomCreatableSelect name={`searchQuery_${index}`} instanceId={id} isMulti={true}
                                                           className={trainingClasses.querySelect}></CustomCreatableSelect>
                                </React.Fragment>);
                            })}
                        </ul>
                    </div>

                    <label className={classes.labelledInputContainer}>
                        <span className={classes.labelledInputContainer__label}>Output Quantity</span>
                        <input type="range" id={'desired_data'} name={'desired_data'} min={20} max={50}
                               defaultValue={30}
                               className={classes.outputQuantityRange}/>
                    </label>

                    <label className={classes.labelledInputContainer}>
                        <span className={classes.labelledInputContainer__label}>Number of images to </span>
                        <input type="range" id={'num_images_to_ask_for_hf'} name={'num_images_to_ask_for_hf'} min={20}
                               max={50} defaultValue={30}
                               className={classes.outputQuantityRange}/>
                    </label>

                </div>
            </form>
        </div>
    );
}