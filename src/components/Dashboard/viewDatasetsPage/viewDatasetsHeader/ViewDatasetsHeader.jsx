import classes from "./ViewDatasetsHeader.module.css";
import MiniProfile from "../../../UI/miniProfile/MiniProfile";
import SearchBar from "../../../UI/searchBar/SearchBar";
import Button from "../../../UI/button/Button";
import Image from "../../../../images/HeroImage.jpg";

export default function ViewDatasetsHeader() {
   return (
      <header className={classes.header}>
         <MiniProfile name="Ray" email="ray@gmail.com" image={Image} />
         <div className={classes.searchWrapper}>
            <SearchBar placeHolder="Find your datasets" />
         </div>
         <div className={classes.btnWrapper}>
            <Button
               hasArrow={true}
               gradientDirection="leftToRight"
               text="Create new dataset"
               link="/"
            />
         </div>
      </header>
   );
}
