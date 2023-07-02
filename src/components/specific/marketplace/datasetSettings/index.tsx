import { useRouter } from 'next/router';

import Input from '@/components/specific/marketplace/datasetSettings/input';
import CreatableSelect from '@/components/specific/marketplace/datasetSettings/creatableSelect';
import RadioButtons from '@/components/ui/input/radioButtons';

import api from '@/helpers/api';

import cash from '@/icons/main/dollar-sign.svg';
import link from '@/icons/main/link.svg';

import classes from './styles.module.css';

import { DATASET_LICENSE_DESCRIPTION, DATASET_LICENSE_ENUM } from '@/helpers/enums/license';
import Select from '@/components/specific/marketplace/datasetSettings/select';

const licenseOptions = DATASET_LICENSE_ENUM._def.values.map(license => {
    return {
        label: DATASET_LICENSE_DESCRIPTION[license],
        value: license,
    };
});

export default function DatasetSettings(dataset: PreviewDataset) {
    const router = useRouter();

    return (
        <div className={ classes.contentInfoContainer }>
            <section className={ classes.section }>
                <h2 className={ classes.heading }>General Settings</h2>

                <div className={ classes.sectionContent }>
                    <Input
                        label="Transfer ownership"
                        type="string"
                        icon={ link.src }
                        placeholder="New user"
                        tooltip="Change ownership of the dataset to another dataset."
                        onSave={ async (data) => {
                            await api.patch(
                                `/api/datasets/${dataset._id}/ownership`,
                                {
                                    username: data,
                                    retainAdmin: true,
                                },
                            );
                        } }
                    />

                    <RadioButtons
                        options={ [
                            {
                                value: true,
                                label: 'Public',
                            },
                            {
                                value: false,
                                label: 'Private',
                            },
                        ] }
                        label="Change visibility"
                        initialValue={ dataset.public }
                        tooltip="Changing this setting to public allows your dataset to appear on the marketplace, while changing it to private hides it."
                        onChange={ async (data) => {
                            await api.patch(
                                `/api/datasets/${dataset._id}/visibility`,
                                {
                                    public: data,
                                },
                            );
                        } }
                    />

                    <Input
                        label="Set price"
                        type="number"
                        icon={ cash.src }
                        max={ 100 }
                        placeholder="New amount"
                        initialValue={ dataset.price }
                        tooltip={
                            'Setting the price of the dataset will allow you to charge for the dataset, ' +
                            'but prevents users without explicit permissions from viewing or contributing.'
                        }
                        onSave={ async (data) => {
                            await api.patch(
                                `/api/datasets/${dataset._id}/price`,
                                {
                                    price: +data,
                                },
                            );
                        } }
                        saveLabel="Save"
                    />

                    <CreatableSelect
                        placeholder="Add tags"

                        initialValue={ dataset.tags }
                        label="Adjust tags"
                        tooltip="Tags help Flockfysh categorize your dataset better so that users who need it can easily locate it."
                        onChange={ async (data) => {
                            await api.patch(`/api/datasets/${dataset._id}`, {
                                tags: data,
                            });
                        } }
                    />

                    <Select
                        initialValue={ licenseOptions[0] }
                        label="Adjust license"
                        tooltip="License helps or prevents legal access to the dataset."
                        options={ licenseOptions }
                        onChange={ async (data) => {
                            await api.patch(`/api/datasets/${dataset._id}/license`, {
                                license: data,
                            });
                        } }
                    />
                </div>
            </section>

            <section className={ classes.section }>
                <h2 className={ classes.heading }>Danger Zone</h2>

                <button
                    className={ classes.dangerButton }
                    onClick={ async () => {
                        await api.delete(`/api/datasets/${dataset._id}`);
                        await router.push('/marketplace');
                    } }
                >
                    Delete dataset
                </button>
            </section>
        </div>
    );
}
