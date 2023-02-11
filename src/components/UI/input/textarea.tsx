import React, { ComponentPropsWithoutRef, ForwardedRef } from 'react';

import classes from './textarea.module.css';

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    label?: string,
    innerClassName?: string,
}

const Textarea = React.forwardRef(function Textarea(props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const invisibleDivRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const textarea = textareaRef.current;
        const invisibleDiv = invisibleDivRef.current;
        function update() {
            if (textarea && invisibleDiv) {
                textarea.style.height = '0';
                const height = textarea.scrollHeight;
                textarea.style.height = height + 'px';
                invisibleDiv.style.height = height + 'px';
            }
        }
        update();
        textarea?.addEventListener('input', update);
        return () => {
            textarea?.removeEventListener('input', update);
        };
    }, []);

    return (
        <label className={ `${classes.textareaContainer} ${props.className || ''}` }>
            { props.label ? <span className={ 'font-semibold' }>{ props.label }</span> : null }

            <div className="flex relative z-0">
                <textarea
                    { ...props }
                    ref={ elem => {
                        if (typeof ref === 'function') {
                            ref(elem);
                        }
                        else if (ref) {
                            ref.current = elem;
                        }
                        textareaRef.current = elem;
                    } }
                    className={ `${classes.textarea} ${props.innerClassName || ''}` }
                />
                
                <div ref={ invisibleDivRef }></div>
            </div>
        </label>
    );
});

export default Textarea;
