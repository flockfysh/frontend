import { firstLine, secondLine, thirdLine } from "../../../../reviewdata.js";
import ReviewCard from "../../../UI/Cards/ReviewCard";
import SubHeading from "../../../UI/Headings/Subheading";
import classes from "./Reviews.module.css";

const Reviews = () => {
   return (
      <section className={classes.reviewSection}>
         <SubHeading beforeSpan="Wall of " span="Love" afterSpan="" />
         <div className={classes.cardsCollection}>
            <div className={classes.cardsGroup}>
               {firstLine.map(review => (
                  <ReviewCard
                     image={review.image}
                     content={review.content}
                     designation={review.designation}
                     name={review.name}
                  />
               ))}
            </div>
            <div className={classes.cardsGroup}>
               {secondLine.map(review => (
                  <ReviewCard
                     image={review.image}
                     content={review.content}
                     designation={review.designation}
                     name={review.name}
                  />
               ))}
            </div>
            <div className={classes.cardsGroup}>
               {thirdLine.map(review => (
                  <ReviewCard
                     image={review.image}
                     content={review.content}
                     designation={review.designation}
                     name={review.name}
                  />
               ))}
            </div>
         </div>
         <h4 className={classes.moreText}>And many more...</h4>
      </section>
   );
};

export default Reviews;
