import { forwardRef, useRef, ForwardedRef } from 'react';
import Select, { Props, GroupBase, SelectInstance } from 'react-select';

import AsyncCreatableSelect, {
    AsyncCreatableProps,
} from 'react-select/async-creatable';
import AsyncSelect, { AsyncProps } from 'react-select/async';

import classes from './styles.module.css';

const theme = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: 'var(--elements-900)',
        primary25: 'var(--main-grey)',
        primary50: 'var(--elements-600)',
        neutral80: 'var(--white)',
        neutral10: 'var(--elements-900)',
    },
});

const CustomSelect = forwardRef<any, Props<any, any, any>>(
    function _CustomSelect<
        Option,
        IsMulti extends boolean = false,
        Group extends GroupBase<Option> = GroupBase<Option>
    >(
        props: Props<Option, IsMulti, Group>,
        ref: ForwardedRef<SelectInstance<Option, IsMulti, Group>>
    ) {
        const selectRef = useRef<SelectInstance<Option, IsMulti, Group> | null>(
            null
        );
        return (
            <Select
                { ...props }
                theme={ theme }
                className={ props.className }
                classNames={ {
                    ...props.classNames,
                    control(...args) {
                        return `${classes.control} ${
                            props.classNames?.control?.(...args) || ''
                        }`;
                    },
                    placeholder(...args) {
                        return `${classes.placeholder} ${
                            props.classNames?.placeholder?.(...args) || ''
                        }`;
                    },
                    menu(...args) {
                        return `${classes.menu} ${
                            props.classNames?.menu?.(...args) || ''
                        }`;
                    },
                } }
                ref={ (e) => {
                    if (typeof ref === 'function') ref(e);
                    else if (ref) ref.current = e;

                    selectRef.current = e;
                } }
            />
        );
    }
);

export const AsyncCustomSelect = forwardRef<any, AsyncProps<any, any, any>>(
    function _CustomSelect<
        Option,
        IsMulti extends boolean = false,
        Group extends GroupBase<Option> = GroupBase<Option>
    >(
        props: AsyncProps<Option, IsMulti, Group>,
        ref: ForwardedRef<SelectInstance<Option, IsMulti, Group>>
    ) {
        const selectRef = useRef<SelectInstance<Option, IsMulti, Group> | null>(
            null
        );
        return (
            <AsyncSelect
                { ...props }
                theme={ theme }
                className={ props.className }
                classNames={ {
                    ...props.classNames,
                    control(...args) {
                        return `${classes.control} ${
                            props.classNames?.control?.(...args) || ''
                        }`;
                    },
                    placeholder(...args) {
                        return `${classes.placeholder} ${
                            props.classNames?.placeholder?.(...args) || ''
                        }`;
                    },
                    menu(...args) {
                        return `${classes.menu} ${
                            props.classNames?.menu?.(...args) || ''
                        }`;
                    },
                } }
                ref={ (e) => {
                    if (typeof ref === 'function') ref(e);
                    else if (ref) ref.current = e;

                    selectRef.current = e;
                } }
            />
        );
    }
);

export const CustomCreatableSelect = forwardRef<
    any,
    AsyncCreatableProps<any, any, any>
>(function _CreatableCustomSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: AsyncCreatableProps<Option, IsMulti, Group>,
    ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
    return (
        <AsyncCreatableSelect
            { ...props }
            onChange={ (...args) => {
                props.onChange?.(...args);
            } }
            theme={ theme }
            className={ props.className }
            classNames={ {
                ...props.classNames,
                control(...args) {
                    return `${classes.control} ${
                        props.classNames?.control?.(...args) || ''
                    }`;
                },
                placeholder(...args) {
                    return `${classes.placeholder} ${
                        props.classNames?.placeholder?.(...args) || ''
                    }`;
                },
                menu(...args) {
                    return `${classes.menu} ${
                        props.classNames?.menu?.(...args) || ''
                    }`;
                },
            } }
            ref={ (e) => {
                if (typeof ref === 'function') ref(e);
                else if (ref) ref.current = e;
            } }
        />
    );
});

export default CustomSelect;
