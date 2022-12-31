import Subheading from '../../UI/subHeading/subHeading';
import FeatureCard from '../featureCard/featureCard';

import classes from './features.module.css';

export default function Features() {
  const LEFT_CARD_CONTENT = (
    <>
      Our tool can be picked up and used for any hobbyist or company, and easily
      tailored to your personal needs. Clearly receive the dataset you envision,
      with support around the clock.
    </>
  );

  const MIDDLE_CARD_CONTENT = (
    <>
      Provide our tool with a sample of 50 images of the type of data you are
      looking for, and then watch the magic ensue!
      <strong> No constant searching for images, </strong> and{' '}
      <strong>no supervision necessary.</strong>
    </>
  );

  const RIGHT_CARD_CONTENT = (
    <>
      Seamlessly combine, auto-annotate, and enlarge datasets specific to your
      needs. Our tools easily adapt to existing datasets you have, and create
      more data / annotations.
    </>
  );

  return (
    <section className={ classes.featureSectionDiv }>
      <Subheading
        beforeSpan="Quality datasets, "
        span="zero "
        afterSpan="effort"
      />

      <div className={ classes.cardRow }>
        <FeatureCard
          image="rocket"
          heading="Control"
          content={ LEFT_CARD_CONTENT }
        />

        <FeatureCard
          image="sparkles"
          heading="Painless"
          content={ MIDDLE_CARD_CONTENT }
        />

        <FeatureCard
          image="banknotes"
          heading="Flexibility"
          content={ RIGHT_CARD_CONTENT }
        />
      </div>
    </section>
  );
}
