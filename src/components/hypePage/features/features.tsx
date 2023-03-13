import classes from './features.module.css';

import ctrlIcon from '../../../images/icons/ctrl.svg';
import painlessIcon from '../../../images/icons/painless.svg';
import flexIcon from '../../../images/icons/flex.svg';
import compatibilityIcon from '../../../images/icons/compatibility.svg';

export default function Features() {
    const featureItems = [
        {
            name: 'control',
            title: 'Control',
            src: ctrlIcon,
            description: 'Our tool can be picked up and used for any hobbyist or company, and easily tailored to your personal needs. Clearly receive the dataset you envision, with support around the clock.'
        },
        {
            name: 'painless',
            title: 'Painless',
            src: painlessIcon,
            description: 'Provide our tool with a sample of 50 images of the type of data you are looking for, and then watch the magic ensue! No constant searching for images, and no supervision necessary.'
        },
        {
            name: 'flexivility',
            title: 'Flexibility',
            src: flexIcon,
            description: 'Seamlessly combine, auto-annotate, and enlarge datasets specific to your needs. Our tools easily adapt to existing datasets you have, and create more data / annotations.'
        },
        {
            name: 'compatibility',
            title: 'Compatibility',
            src: compatibilityIcon,
            description: 'Our tools are built with complete integrability in mind. Use all of your favourite ML tools seamlessly in tandem with flockfysh to energize your ML workflows.'
        },
    ];

    return (
        <section className={ classes.featuresWrapper }>
            {featureItems.map(item => (
                <div key={ item.name } className={ classes.featureItem }>
                    <div className={ classes.itemTitle }>
                        <img src={ item.src } alt={ `${item.name}-icon` } />
                        <h3>{item.title}</h3>
                    </div>

                    <div className={ classes.itemDescription }>{item.description}</div>
                </div>
            ))}
        </section>
    );
}
