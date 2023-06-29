import CustomSelect from '@/components/ui/input/select';
import api from '@/helpers/api';
import { formToJSON } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classes from './styles.module.css';

export default function Contributions(dataset: PreviewDataset){

    const router = useRouter();
    const [contributions, setContributions] = useState<Flockfysh.PullRequest[] | null>(null);
    const [curContribution, setCurContribution] = useState<Flockfysh.PullRequest | null>(null);
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'reject', label: 'Reject' },
        { value: 'merge', label: 'Merge' },
        { value: 'publish', label: 'Publish' }
    ];
    useEffect(() => {
        const getContributions = async() => {
            const temp =  ( await api.get(`/api/datasets/${router.query.datasetId}/pullRequests`)).data.data;
            setContributions(temp);
        };
        getContributions();
    }, []);

    async function submitMessage(elem: HTMLFormElement) {
        const fd = formToJSON(elem) as {
            status: string;
            comment: string;
        };
        await api.patch('/api/pullRequests/'+curContribution!._id+'/status', { status: fd.status });
        await api.post('/api/pullRequests/'+curContribution!._id+'/messages', { message: fd.comment });
        return;
    }
    return (
        <>
            <div className={ classes.card }>
                <form onSubmit={ (e) => {
                    e.preventDefault();
                    submitMessage(e.currentTarget);
                } }>
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
        </>
    );
}
