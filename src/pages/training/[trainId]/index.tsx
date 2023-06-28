import classes from './styles.module.css';
import { RxArrowRight } from 'react-icons/rx';
import Button  from '@/components/ui/theming/Button';
import { CustomCreatableSelect } from '@/components/ui/input/select';
import React, { useState } from 'react';
import { LABEL_COLORS } from '@/settings';
import api from '@/helpers/api';
import { AxiosError } from 'axios';
import { ErrorContext } from '@/contexts/errorContext';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layout/MainLayout';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

interface InitiateTrainingRequest {
    class_search_queries: Record<string, string[]>;
    desired_data: number;
}

function TrainingLabels(props: React.ComponentPropsWithRef<'label'> & { labelColor?: string }) {
    const { labelColor, ...smallProps } = props;

    return (
        <label { ...smallProps } className={ `${classes.label} ${props.className || ''}` }>
            <div className={ classes.labelDot } style={ {
                backgroundColor: labelColor ?? LABEL_COLORS[0],
            } }></div>
            {props.children}
        </label>
    );
}

const Train : NextPageWithLayout = function(props: {}) {
    const { throwError } = React.useContext(ErrorContext);
    const [dataset, setDataset] = useState<Flockfysh.PopulatedDataset | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        async function load() {
            const datasetId = router.query.trainId;

            if (typeof datasetId !== 'string') {
                return;
            }
            const result = (await api.get<Api.Response<Flockfysh.PopulatedDataset>>(`/api/datasets/${datasetId}`, {
                params: {
                    expand: 'size,assetCounts,annotationCounts'
                }
            })).data.data;
            setDataset(result);
        }

        load().then();

    }, [router.query.datasetId]);

    if (dataset && dataset!.stage === 'completed') {
        router.push('/datasets/'+router.query.datasetId);
    }

    async function initiateSubmission(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (dataset!.stage === 'untrained') {
                const submissionForm = e.currentTarget;
                const fd = new FormData(submissionForm);
                const classSearchQueries: Record<string, string[]> = {};
                for (const key of fd.keys()) {
                    if (/^searchQuery/.test(key)) {
                        const labelIndex = +key.split('_')[1];
                        const label = dataset!.tags[labelIndex];
                        classSearchQueries[label] = fd.getAll(key) as string[];
                    }
                }
                const requestBody: InitiateTrainingRequest = {
                    // eslint-disable-next-line camelcase
                    desired_data: +(fd.get('desired_data') as string),
                    // eslint-disable-next-line camelcase
                    class_search_queries: classSearchQueries,
                };
                await api.post(`/api/datasets/${dataset!._id}/initializeTraining`, requestBody);
            }
            else if (dataset!.stage === 'feedback') {
                await api.post(`/api/datasets/${dataset!._id}/continueTraining`);
            }
        }
 catch (error) {
            if (error instanceof AxiosError) {
                throwError(error.response?.data.error.message, 'Training error');
            }
        }
    }

    const buttonLabel: Record<string, React.ReactNode> = {
        'untrained': <span>Initiate training</span>,
        'feedback': <span>Continue training</span>,
        'completed': null,
    };

    return dataset ? (
        <div className={ classes.container }>
            <form className={ classes.contentContainer } onSubmit={ initiateSubmission }>
                <div className={ classes.titleBar }>
                    <h1>Dataset training</h1>
                    <Button type={ 'submit' } className={ classes.utilityButton } gradient={ true }>
                        {buttonLabel[dataset!.stage]}
                        <RxArrowRight className={ classes.icon }></RxArrowRight>
                    </Button>
                </div>
                {dataset!.stage === 'untrained' ? (
                    <div className={ classes.formInputs }>
                        <div className={ classes.labelledInputContainer }>
                            <span className={ classes.labelledInputContainer__label }>Search Queries</span>
                            <ul className={ classes.trainingQueriesInputs }>
                                {dataset!.tags.map(function generateSearchQueryInput(classString, index) {
                                    const id = v4();
                                    return (
                                        <React.Fragment key={ index }>
                                            <TrainingLabels htmlFor={ id }
                                                            labelColor={ LABEL_COLORS[index] }>{classString}</TrainingLabels>
                                            <CustomCreatableSelect name={ `searchQuery_${index}` } instanceId={ id }
                                                                   isMulti={ true }
                                                                   className={ classes.querySelect }></CustomCreatableSelect>
                                        </React.Fragment>
                                    );
                                })}
                            </ul>
                        </div>

                        <label className={ classes.labelledInputContainer }>
                            <span className={ classes.labelledInputContainer__label }>Output Quantity</span>
                            <input type="number" id={ 'desired_data' } name={ 'desired_data' } min={ 1 } max={ 10000 }
                                   defaultValue={ 30 }
                                   className={ classes.outputQuantity }/>
                        </label>

                    </div>
                ) : <></>}
            </form>
        </div>
    ) : <></>;
}

Train.getLayout = function (page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};

export default Train;