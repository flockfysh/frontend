import classes from './searchInput.module.css';
import Icon from '../../../images/icons/search.svg';
import React from 'react';

interface SearchInputProps extends React.ComponentPropsWithoutRef<'input'> {
    onLookup?: (data: string) => void
    containerClassName?: string
}

const SearchInput = React.forwardRef(function SearchInput(props: SearchInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const inputRef = React.useRef<HTMLInputElement|null>(null);
    const {containerClassName, onLookup, ...inputProps} = props;
    return (
<div className={`${classes.container} ${containerClassName || ''}`}>
        <input {...inputProps}
               ref={element => {
                   inputRef.current = element;
                   if (ref) {
                       if (typeof ref === 'function') {
                           ref(element);
                       } else {
                           ref.current = element;
                       }
                   }
               }}/>
        <button className={classes.lookupButton} onClick={() => {
            if (inputRef.current && onLookup) {
                onLookup(inputRef.current.value);
            }
        }}>
            <img src={Icon} alt=""/>
        </button>
    </div>
);
});

export default SearchInput;