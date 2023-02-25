import React from 'react';
import { v4 } from 'uuid';
import { ErrorModal } from '../components/UI/modal/modal';

interface IErrorContext {
    throwError: (message: string, title?: string) => void;
}

interface ErrorMessage {
    message?: string,
    title?: string,
}

export const ErrorContext = React.createContext<IErrorContext>({
    throwError: () => {
    },
});

export function ErrorWrapper(props: React.PropsWithChildren) {
    const [{ errorMessages }, setErrorMessages] = React.useState<{
        errorMessages: Map<string, ErrorMessage>
    }>({ errorMessages: new Map() });

    function throwError(message: string, title?: string) {
        let newId: string;
        do {
            newId = v4();
        } while (errorMessages.has(newId));
        errorMessages.set(newId, {
            message: message,
            title: title,
        });
        console.log(errorMessages);
        setErrorMessages({ errorMessages });
    }

    function closeModal(id: string) {
        errorMessages.delete(id);
        setErrorMessages({ errorMessages });
    }

    const errorModals: React.ReactNode[] = [];

    errorMessages.forEach(function createErrorModal({ message, title }, key) {
        errorModals.push(<ErrorModal message={ message || 'Unspecified error.' } title={ title } key={ key }
                                     closeModal={ () => closeModal(key) }/>);
    });

    return (
        <ErrorContext.Provider value={ { throwError } }>
            {errorModals}
            {props.children}
        </ErrorContext.Provider>
    );
}
