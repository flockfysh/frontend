import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { formToJSON } from 'axios';

import CustomSelect from '@/components/ui/input/select';

import api from '@/helpers/api';

import classes from './styles.module.css';
import { BsArrowLeftCircle, BsFillGrid3X3GapFill, BsGrid3X3, BsReverseListColumnsReverse } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdOpenInNew } from 'react-icons/md';
import grid from '@/icons/main/grid.svg';
import list from '@/icons/main/list.svg';
import AssetViewer from '../contributionDetailsGridView/contributionAssetViewer';
import { ReactSVG } from 'react-svg';


export default function ContributionDetails(props: {
    dataset: PreviewDataset,
    contributionId: string,
}) {
    const router = useRouter();
    const dataset = props.dataset;
    const [curContribution, setCurContribution] = useState<ExpandedPullRequest | null>(null);
    const [messages, setMessages] = useState<ExpandedPullRequestMessage[]>([]);
    const [text, setText] = useState<string>('');
    const [showList, setShowList] = useState<boolean>(true);

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'rejected', label: 'Reject' },
        { value: 'merged', label: 'Merge' },
        { value: 'published', label: 'Publish' },
    ];

    useEffect(() => {
        const getContributions = async () => {
            const contribution = (
                await api.get<Api.Response<ExpandedPullRequest>>(
                    `/api/pullRequests/${props.contributionId}`,
                    {
                        params: {
                            expand: 'user,stats',
                        },
                    },
                )
            ).data.data;
            setCurContribution(contribution);
            const tempMessages = (
                await api.get<Api.Response<any>>(
                    `/api/pullRequests/${props.contributionId}/messages`,
                    {
                        params: {
                            expand: 'user'
                        },
                    },
                )
            ).data.data.data;
            console.log(tempMessages);
            setMessages(tempMessages);
        };

        getContributions().then();
    }, [router.query.datasetId]);

    async function changeText(e: ChangeEvent<HTMLTextAreaElement>){
        setText(e.target.value);
    }

    function toggleViewToGrid(){
        setShowList(false);
    }

    function toggleViewToList(){
        setShowList(true);
    }

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
        
        setText('');
        const tempMessage = { message: fd.comment, createdAt: new Date().toString(), updatedAt: new Date().toString(), user: curContribution!.user, pullRequest: props.contributionId };
        setMessages([...messages, tempMessage]);
    }

    if(!curContribution){
        return <></>;
    }

    return (
        <>
        { showList && (
            <div className={ classes.pullRequestContent }>
                <div className={ classes.pullRequestBody }>
                    <div className={ classes.bodyHeader }>
                        <button className={ classes.backButton }><BsArrowLeftCircle/> Back</button>
                        <h3>{ curContribution.name }</h3>
                        <h1>#1</h1>
                    </div>
                    <div className = { classes.message } >
                        <div className= { classes.messageHeader } >
                            <div className={ classes.username } >
                                <CgProfile />
                                <span> { curContribution.user.username }</span>
                            </div>
                            <div className={ classes.time }>
                                <AiOutlineFieldTime/>
                                <h3> { Math.round(Math.abs(new Date().getTime() - new Date(curContribution.createdAt).getTime())/3.6e6) } hours ago</h3>
                            </div>
                        </div>
                        <p>{ curContribution.description }</p>
                        <button className={ classes.changesButton } onClick={ toggleViewToGrid } >View Changes <MdOpenInNew/> </button>
                    </div>
                    <span className={ classes.vl } />
                    <span className={ classes.dot } />
                    { messages.map((message: ExpandedPullRequestMessage) => {
                        return (
                            <>
                                <div className={ classes.message } >
                                    <div className={ classes.messageHeader } >
                                        <div className={ classes.username } >
                                            <CgProfile />
                                            <span> { message.user.username } </span>
                                        </div>
                                        <div className={ classes.time }>
                                            <AiOutlineFieldTime/>
                                            <h3> { Math.round(Math.abs(new Date().getTime() - new Date(message.createdAt).getTime())/3.6e6) } hours ago</h3>
                                        </div>
                                    </div>
                                    <p>{ message.message }</p>
                                </div>
                                <span className={ classes.vl } />
                                <span className={ classes.dot } />
                            </>
                        );
                    }) }
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
                                value={ text }
                                onChange={ changeText }
                                className={ classes.commentField }
                                required={ true }
                                name="comment"
                                placeholder="Add comment here..."
                            />

                            <button className={ classes.submitButton }>Comment</button>
                        </form>
                    </div>
                </div>
                <div className={ classes.pullRequestStats }>
                    <h3 className={ classes.h3 }>Placeholder</h3>
                </div>
            </div>
          ) }
        { !showList && (
            <div className={ classes.assetViewContainer }>
                <div className = { classes.assetViewContainerHeader }>
                    <button className={ classes.backButton }><BsArrowLeftCircle/> Back</button>
                    <h3>{ curContribution.name }</h3>
                    <div className={ classes.toggleButtonsContainer }>
                        <button className={ classes.toggleButton } onClick={ toggleViewToGrid }>
                            <BsGrid3X3/>
                        </button>   

                        <button className={ classes.toggleButton } onClick={ toggleViewToList }>
                            <BsReverseListColumnsReverse />
                        </button>
                    </div>
                </div>
            <AssetViewer contributionId={ props.contributionId } searchQuery={ { displayName:undefined } } showList={ false } />
         </div>
          ) }
        </>
    );
}
