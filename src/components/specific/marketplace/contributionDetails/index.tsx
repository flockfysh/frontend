import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { formToJSON } from 'axios';

import CustomSelect from '@/components/ui/input/select';

import api from '@/helpers/api';

import classes from './styles.module.css';
import { BsArrowLeftCircle } from 'react-icons/bs';

export default function ContributionDetails(props: {
    dataset: PreviewDataset,
    contributionId: string,
}) {
    const router = useRouter();
    const dataset = props.dataset;
    const [curContribution, setCurContribution] = useState<ExpandedPullRequest | null>(null);

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'reject', label: 'Reject' },
        { value: 'merge', label: 'Merge' },
        { value: 'publish', label: 'Publish' },
    ];

    useEffect(() => {
        const getContributions = async () => {
            const temp = (
                await api.get<Api.Response<ExpandedPullRequest>>(
                    `/api/pullRequests/${props.contributionId}`,
                    {
                        params: {
                            expand: 'user,stats',
                        },
                    },
                )
            ).data.data;
            setCurContribution(temp);
            console.log(temp);
        };

        getContributions().then();
    }, [router.query.datasetId]);

    async function submitMessage(elem: HTMLFormElement) {
        const fd = formToJSON(elem) as {
            status: string;
            comment: string;
        };

        await api.patch(
            '/api/pullRequests/' + curContribution!._id + '/status',
            { status: fd.status },
        );

        await api.post(
            '/api/pullRequests/' + curContribution!._id + '/messages',
            { message: fd.comment },
        );
    }

    if(!curContribution){
        return <></>
    }
    
    return (
        <div className={classes.pullRequestContent}>
            <div className={classes.pullRequestBody}>
                <div className={classes.bodyHeader}>
                    <button className={classes.backButton}><BsArrowLeftCircle/> Back</button>
                    <h3>{curContribution.name}</h3>
                </div>
                <div className={ classes.card }>
                    <form
                        onSubmit={ (e) => {
                            e.preventDefault();
                            submitMessage(e.currentTarget);
                        } }
                    >
                        <div className={ classes.cardTop }>
                            <h1 className={ classes.headerText }>Comment</h1>

                            <CustomSelect
                                required={ true }
                                name="status"
                                className={ classes.select }
                                placeholder="Status"
                                options={ statusOptions }
                            />
                        </div>

                        <textarea
                            className={ classes.commentField }
                            required={ true }
                            name="comment"
                            placeholder="Add comment here..."
                        />

                        <button className={ classes.submitButton }>Comment</button>
                    </form>
                </div>
            </div>
            <div className={classes.pullRequestStats}>
                <h3 className={classes.h3}>Placeholder</h3>
            </div>
        </div>
    );
}
