import { reviews } from '../../../reviewData';

import ReviewCard from '../reviewCard/reviewCard';
import SubHeading from '../../UI/subHeading/subHeading';

import classes from './reviews.module.css';

export default function Reviews() {
  return (
    <section className={ classes.reviewSection }>
      <SubHeading beforeSpan="Wall of " span="Love" afterSpan="" />

      <div className={ classes.cardsCollection }>
        {
          reviews.map(
            (cards, cardsIndex) => (
              <div className={ `${classes.cardsGroup} ${cardsIndex !== 0 ? classes.desktopOnlyGroup : ""}` } key={ cardsIndex }>
                {
                  cards.map(
                    (review, reviewIndex) => (
                      <ReviewCard
                        image={ review.image }
                        content={ review.content }
                        designation={ review.designation }
                        name={ review.name }
                        key={ reviewIndex }
                      />
                    )
                  )
                }
              </div>
            )
          )
        }
      </div>

      <h4 className={ classes.moreText }>And many more...</h4>
    </section>
  );
}
