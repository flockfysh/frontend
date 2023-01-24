import classes from "./selectInput.module.css";
import Select, {Props, GroupBase, SelectInstance} from "react-select";
import React from "react";


const CustomSelect = React.forwardRef<any, Props>(function _CustomSelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>) {
    return <Select
        {...props}
        classNames={{
            control(state) {
                return `${classes.selectElementControl} ${props.classNames?.control?.(state) || ""}`;
            },
            valueContainer(state) {
                return `${classes.selectValueContainer} ${props.classNames?.valueContainer?.(state) || ""}`;
            },
            singleValue(state) {
                return `${classes.selectValue} ${props.classNames?.singleValue?.(state) || ""}`;
            },
            input(state) {
                return `${classes.selectInput} ${props.classNames?.input?.(state) || ""}`;
            },
            option(state) {
                let internalClass: string;
                if (state.isSelected) {
                    internalClass = `${classes.selectOption} ${classes.selectedSelectOption}`;
                } else if (state.isFocused) {
                    internalClass = `${classes.selectOption} ${classes.focusedSelectOption}`;
                } else {
                    internalClass = classes.selectOption;
                }
                return `${internalClass} ${props.classNames?.option?.(state) || ""}`;
            },
            menuList(state) {
                return `${classes.selectMenuList} ${props.classNames?.menuList?.(state) || ""}`;
            },
            menu(state) {
                return `${classes.selectMenu} ${props.classNames?.menu?.(state) || ""}`;
            },
            placeholder(state) {
                return `${classes.selectPlaceholder} ${props.classNames?.placeholder?.(state) || ""}`;
            }
        }}
        className={`${classes.selectElement} ${props.className || ""}`} ref={e => {
        if (typeof ref === "function") {
            ref(e);
        } else if (ref) {
            ref.current = e;
        }
    }}/>;
});

export default CustomSelect;