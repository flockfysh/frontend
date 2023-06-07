import React, { forwardRef } from 'react';
import classes from './styles.module.css';
import Select, { Props, StylesConfig, GroupBase, SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const theme = (theme: any) => (
    {
        ...theme,
        colors: {
            ...theme.colors,
            primary: 'var(--elements-900)',
            primary25: 'var(--main-grey)',
            primary50: 'var(--elements-600)',
            neutral80: 'var(--white)',
            neutral10: 'var(--elements-900)',
        }
    }
);

const styles: StylesConfig = {
    control: (base) => (
        {
            ...base,
            background: 'var(--main-grey)',
            border: 'none',
            outline: 'none',
            borderRadius: '8px',
        }
    ),
    menu: (base) => (
        {
            ...base,
            background: 'var(--main-grey)',
            borderRadius: '8px',
        }
    ),
    placeholder: (base) => (
        {
            ...base,
            color: 'var(--white)',
        }
    )
};

const CustomSelect = forwardRef<any, Props>(function _CustomSelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>) {
    const selectRef = React.useRef<SelectInstance<Option, IsMulti, Group> | null>(null);

    return (
        <Select
            { ...props }
            styles={ styles as unknown as StylesConfig<Option, IsMulti, Group> }
            theme={ theme }
            className={ props.className }
            classNames={ {
                ...props.classNames,
            } }
            ref={ e => {
                if (typeof ref === 'function') {
                    ref(e);
                }
 else if (ref) {
                    ref.current = e;
                }
                selectRef.current = e;
            } }
        />
    );
});

export const CustomCreatableSelect = forwardRef<any, Props>(function _CreatableCustomSelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>) {
    return (
        <CreatableSelect
            { ...props }
            styles={ styles as unknown as StylesConfig<Option, IsMulti, Group> }
            theme={ theme }
            className={ props.className }
            ref={ e => {
                if (typeof ref === 'function') {
                    ref(e);
                }
 else if (ref) {
                    ref.current = e;
                }
            } }
        />
    );
});

export default CustomSelect;