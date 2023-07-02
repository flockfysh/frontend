import { useState, useContext } from 'react';
import { ReactSVG } from 'react-svg';

import { PopupModalContext } from '@/components/ui/modals/actionPopup';
import FileUpload from '@/components/fileUpload/index';

import {
    uploadTypeMapping,
    uploadToPullRequest,
} from '@/helpers/assets/upload';

import edit from '@/icons/main/edit-3.svg';
import database from '@/icons/main/database.svg';

import classes from './contribute.module.css';

import api from '@/helpers/api';

type ContributeProps = {
    dataset: {
        _id: string;
        type: Flockfysh.AssetType;
    };
    children?: React.ReactNode;
};

export default function Contribute(props: ContributeProps) {
    const { close } = useContext(PopupModalContext);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    async function uploadPullRequest(
        dataset: {
            _id: string;
            type: Flockfysh.AssetType;
        },
        formData: FormData
    ) {
        const uploadData = {
            name: formData.get('name'),
            description: formData.get('description'),
        };
    
        const files = formData.getAll('files').filter((item) => {
            return item instanceof File && item.size > 0;
        }) as File[];
    
        const pullRequest = await api
        .post<Api.Response<Flockfysh.PullRequest>>(
            `/api/datasets/${dataset._id}/pullRequests`,
            uploadData
            )
            .then((res) => res.data.data);
            
            const config = uploadTypeMapping[dataset.type];
            
        uploadToPullRequest(pullRequest._id, files, config);    

        close();
    }

    return (
        <form
            className={ classes.container }
            onSubmit={ async (e) => {
                e.preventDefault();

                await uploadPullRequest(
                    props.dataset,
                    new FormData(e.currentTarget)
                );
            } }
        >
            <div className={ classes.inputDiv }>
                <h4 className={ classes.subheading }>Title</h4>

                <div className={ classes.mergedInput }>
                    <ReactSVG src={ edit.src } className={ classes.icon }/>

                    <input
                        className={ classes.input }
                        name={ 'name' }
                        type="text"
                        value={ title }
                        onChange={ (event) => {
                            setTitle(event.target.value);
                        } }
                    />
                </div>
            </div>

            <div className={ classes.inputDiv }>
                <h4 className={ classes.subheading }>Describe your request</h4>

                <div>
                    <textarea
                        className={ classes.textArea }
                        name="description"
                        placeholder="Describe what is in your contribution. Be as precise as you can"
                        onChange={ (event) => {
                            setBody(event.target.value);
                        } }
                        value={ body }
                    />
                </div>
            </div>

            <div className={ classes.inputDiv }>
                <h4 className={ classes.subheading }>Files</h4>

                <FileUpload
                    uploadContainerClassName={ `${classes.uploadContainer}` }
                    datasetType={ props.dataset.type }
                    name="files"
                />
            </div>

            <button className={ classes.button }>
                Submit Request
                <ReactSVG src={ database.src } className={ classes.icon }/>
            </button>
        </form>
    );
}
