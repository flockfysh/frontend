import classes from "./selectInput.module.css";
import Select, {Props, GroupBase} from "react-select";

export default function CustomSelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group>) {
    return <Select className={classes.selectElement}
                   classNames={{
                       control(state) {
                           // console.log(state);
                           return classes.selectElementControl;
                       },
                       valueContainer() {
                           return classes.selectValueContainer;
                       },
                       singleValue() {
                           return classes.selectValue;
                       },
                       input() {
                           return classes.selectInput;
                       },
                       option(state) {
                           if (state.isSelected) {
                               return `${classes.selectOption} ${classes.selectedSelectOption}`;
                           } else if (state.isFocused) {
                               return `${classes.selectOption} ${classes.focusedSelectOption}`;
                           } else {
                               return classes.selectOption;
                           }
                       },
                       menuList() {
                           return classes.selectMenuList;
                       },
                       menu() {
                           return classes.selectMenu;
                       }
                   }} {...props}/>;
}