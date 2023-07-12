import { useRouter } from 'next/router';

import DatasetGeneralSettings from '@/components/specific/marketplace/datasetSettings/generalSettings';
import RadioButtons from '@/components/ui/input/radioButtons';
import DatasetPermissionManager from '@/components/specific/marketplace/datasetSettings/permissionManager';

import classes from './styles.module.css';

export default function DatasetSettingsLayout(dataset: PreviewDataset) {
    const router = useRouter();
    const tab = (router.query.tab ?? 'general').toString();

    const options = [
        {
            label: 'General',
            heading: 'General Settings',
            value: `/marketplace/${dataset._id}/settings?tab=general`,
            component: DatasetGeneralSettings,
        },
        {
            label: 'Contributions',
            heading: 'Contribution Settings',
            value: `/marketplace/${dataset._id}/settings?tab=contributions`,
            component: DatasetPermissionManager,
        },
    ];

    const filter = function (value: string) {
        return new URL(value, 'https://example.com').searchParams.get('tab') === tab;
    };

    const currentOption = options.filter(i => filter(i.value))[0] ?? options[0];

    return (
        <div className={ classes.contentInfoContainer }>
            <div className={ classes.navigationBar }>
                <h2 className={ classes.navigationHeading }>{ currentOption.heading }</h2>
                <RadioButtons options={ options } highlightCallback={ filter } isLink={ true }></RadioButtons>
            </div>
            <div className={ classes.childContent }>
                { currentOption.component ? <currentOption.component { ...dataset }/> : null }
            </div>
        </div>
    );
}
