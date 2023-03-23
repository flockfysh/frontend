import ctrlIcon from '../../../images/icons/ctrl.svg';
import effortlessIcon from '../../../images/icons/effortless.svg';
import flexIcon from '../../../images/icons/flex.svg';
import compatibilityIcon from '../../../images/icons/compatibility.svg';

import classes from './features.module.css';

export default function Features() {
    const featureItems = [
        {
            name: 'control',
            title: 'Control',
            src: ctrlIcon,
            description: 'flockfysh can be picked up and used by any researcher, hobbyist, or company, and easily tailored to your personal needs. Clearly receive the dataset you envision with support around the clock.',
        },
        {
            name: 'compatibility',
            title: 'Compatibility',
            src: compatibilityIcon,
            description: 'flockfysh is built with complete integrability in mind. Use all of your favorite ML tools seamlessly in tandem with flockfysh to energize your ML workflows.',
        },
        {
            name: 'flexivility',
            title: 'Flexibility',
            src: flexIcon,
            description: 'Seamlessly combine, auto-annotate, and enlarge datasets specific to your needs. flockfysh easily adapts to existing datasets you have and creates more data / annotations.',
        },
        {
            name: 'effortless',
            title: 'Effortless',
            src: effortlessIcon,
            description: 'Provide flockfysh with 50 sample images of the data you are looking for and then watch the magic ensue! No constant searching for data and nearly zero supervision necessary.',
        },
    ];

    return (
        <section className={ classes.featuresWrapper }>
            {
                featureItems.map(item => (
                    <div key={ item.name } className={ classes.featureItem }>
                        <div className={ classes.itemTitle }>
                            <img src={ item.src } alt={ `${item.name}-icon` }/>
                            <h3>{item.title}</h3>
                        </div>

                        <div className={ classes.itemDescription }>{item.description}</div>
                    </div>
                ))
            }
        </section>
    );
}
