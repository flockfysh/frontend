import { useState, useEffect, forwardRef, useRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';

import classes from './textarea.module.css';

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    label?: string,
    innerClassName?: string,
}

const Textarea = forwardRef(function Textarea(props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const invisibleDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        const invisibleDiv = invisibleDivRef.current;

        function update() {
            if(textarea && invisibleDiv) {
                textarea.style.height = '0';

                const height = textarea.scrollHeight;
                
                textarea.style.height = height + 'px';
                invisibleDiv.style.height = height + 'px';
            }
        }

        update();
        textarea?.addEventListener('input', update);
        
        return () => textarea?.removeEventListener('input', update);
    }, []);

    return (
        <label className={ `${ classes.textareaContainer } ${ props.className || '' }` }>
            { props.label ? <span>{ props.label }</span> : null }

            <div>
                <textarea
                    { ...props }
                    ref={
                        elem => {
                            if(typeof ref === 'function') ref(elem);
                            else if(ref) ref.current = elem;
                            
                            textareaRef.current = elem;
                        }
                    }

                    className={ `${ classes.textarea } ${ props.innerClassName || '' }` } 
                />

                <div ref={ invisibleDivRef } />
            </div>
        </label>
    );
});

export default Textarea;
