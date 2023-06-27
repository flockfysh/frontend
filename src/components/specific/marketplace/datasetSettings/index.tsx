import classes from './styles.module.css';
import RadioButtons from '@/components/specific/marketplace/DatasetSettings/RadioButtons';
import api from '@/helpers/api';
import Input from '@/components/specific/marketplace/DatasetSettings/Input';
import cash from '@/icons/main/dollar-sign.svg';
import link from '@/icons/main/link.svg';
import CreatableSelect from '@/components/specific/marketplace/DatasetSettings/CreatableSelect';
import { useRouter } from 'next/router';

export default function DatasetSettings(dataset: PreviewDataset) {
    const router = useRouter();

    return (
        <div className={ classes.contentInfoContainer }>
            <section className={ classes.section }>
                <h2 className={ classes.heading }>General Settings</h2>
                <div className={ classes.sectionContent }>
                    <Input
                        label={ 'Transfer ownership' }
                        type={ 'string' }
                        icon={ link.src }
                        placeholder={ 'New user' }
                        tooltip={ 'Change ownership of the dataset to another dataset.' }
                        onSave={ async data => {
                            await api.patch(`/api/datasets/${dataset._id}/price`, {
                                price: +data,
                            });
                        } }
                    />
                    <RadioButtons
                        options={ [{
                            value: true,
                            label: 'Public',
                        }, {
                            value: false,
                            label: 'Private',
                        }] }
                        label={ 'Change visibility' }
                        initialValue={ dataset.public }
                        tooltip={ 'Changing this setting to public allows your dataset to appear on the marketplace, while changing it to private hides it.' }
                        onChange={ async data => {
                            await api.patch(`/api/datasets/${dataset._id}/visibility`, {
                                public: data,
                            });
                        } }
                    />
                    <Input
                        label={ 'Set price' }
                        type={ 'number' }
                        icon={ cash.src }
                        max={ 100 }
                        placeholder={ 'New amount' }
                        initialValue={ dataset.price }
                        tooltip={ 'Setting the price of the dataset will allow you to charge for the dataset, ' +
                            'but prevents users without explicit permissions from viewing or contributing.' }
                        onSave={ async data => {
                            await api.patch(`/api/datasets/${dataset._id}/price`, {
                                price: +data,
                            });
                        } }
                        saveLabel={ 'Save' }
                    />
                    <CreatableSelect
                        placeholder={ 'Add tags' }
                        initialValue={ dataset.tags } label={ 'Adjust tags' }
                        tooltip={ 'Tags help Flockfysh categorize your dataset better so that users who need it can easily locate it.' }
                        onChange={ async data => {
                            await api.patch(`/api/datasets/${dataset._id}`, {
                                tags: data,
                            });
                        } }/>
                </div>
            </section>
            <section className={ classes.section }>
                <h2 className={ classes.heading }>Danger Zone</h2>
                <button className={ classes.dangerButton } onClick={ async () => {
                    await api.delete(`/api/datasets/${dataset._id}`);
                    await router.push('/marketplace');
                } }>Delete dataset
                </button>
            </section>
        </div>
    );
}
