import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';
import grid from '@/icons/main/grid.svg';
import list from '@/icons/main/list.svg';
import AssetViewer from './contributionAssetViewer';

export default function ContributionDetailsGridView(props: {
    dataset: PreviewDataset,
    contributionId: string,
}) {
    const [_showList, setShowList] = useState<boolean>(true);

    const toggleViewToList = () => {
        setShowList(true);
    };

    const toggleViewToGrid = () => {
        setShowList(false);
    };

    return (
        <div>
            <div className={ classes.tableViewButtonsWrapper }>
                <button onClick={ toggleViewToGrid }>
                    <ReactSVG
                        className={ classes.icon }
                        src={ grid.src }
                    />
                </button>

                <div className={ classes.separator } />

                <button onClick={ toggleViewToList }>
                    <ReactSVG
                        className={ classes.icon }
                        src={ list.src }
                    />
                </button>
            </div>
            <AssetViewer contributionId={ props.contributionId } searchQuery={ { displayName:undefined } } showList={ false } />
        </div>
    );
}
