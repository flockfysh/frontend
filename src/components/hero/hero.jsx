import classes from "./hero.module.css";

export default function hero() {
   return (
      <>
         <h1 className={classes.heroText}>Flockfysh is so cool. blah blah blah blah</h1>
         <div className={classes.heroImage}>
            <img src="https://via.placeholder.com/1169x600?text=FlockFysh+Hero+Image" alt="Demo" />
         </div>
         <div className={classes.sumContent}></div>
      </>
   );
}
