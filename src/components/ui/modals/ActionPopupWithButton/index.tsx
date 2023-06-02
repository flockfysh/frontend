import React from 'react';
import ActionPopup from '@/components/ui/modals/ActionPopup';

interface ActionPopupWithButtonProps {
    button: JSX.Element,
    children: React.ReactNode,
    popupTitle: string,
    blurBg?: boolean,
}

export default function ActionPopupWithButton(props: ActionPopupWithButtonProps) {
    const [open, setOpen] = React.useState(false);
    const clonedButton = React.cloneElement<React.ComponentPropsWithRef<'button'>>(props.button, {
        async onClick(e) {
            setOpen(true);
            return await props.button.props.onClick?.(e);
        }
    });

    return (
        <>
            {clonedButton}
            {open ? (
                <ActionPopup popupTitle={ props.popupTitle } onClose={ () => {
                    setOpen(false);
                } } blurBg={ props.blurBg ?? true }>{
                    props.children
                }</ActionPopup>
            ) : <></>}
        </>
    );
}
