import Card from '@/components/ui/card';

import ctrlIcon from '@/icons/hype/ctrl.svg';
import effortlessIcon from '@/icons/hype/effortless.svg';
import flexIcon from '@/icons/hype/flex.svg';
import compatibilityIcon from '@/icons/hype/compatibility.svg';

import classes from './features.module.css';

export default function Features() {
    const featureItems = [
        {
            name: 'control',
            title: 'Control',
            src: ctrlIcon.src,
            description: 'flockfysh can be picked up and used by any researcher, hobbyist, or company, and easily tailored to your personal needs. Go from idea to dataset or model you envision with support around the clock.',
        },
        {
            name: 'compatibility',
            title: 'Compatibility',
            src: compatibilityIcon.src,
            description: 'flockfysh is built with complete integrability in mind. Easily locate and directly integrate workflows that ranging from data quality assurance to seamless intermediate data processing.',
        },
        {
            name: 'privacy',
            title: 'Privacy Aware',
            src: flexIcon.src,
            description: 'From integrating workflows that automatically locate copyrighted data to finding, be 100% confident all your data is ethically clean.',
        },
        {
            name: 'flexibility',
            title: 'Flexibility',
            src: effortlessIcon.src,
            description: 'Directly interact and source data and models from fellow users while maintaining a path towards commercialization or impactful open source.',
        },
    ];

    return (
        <section className={ classes.featuresWrapper }>
            {
                featureItems.map((item, i) => (
                    <Card key={ i } heading={ item.title } body={ item.description } icon={ item.src }/>
                ))
            }
        </section>
    );
}
