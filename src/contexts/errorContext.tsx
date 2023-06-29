import { createContext, useState } from 'react';
import { v4 } from 'uuid';

import ErrorModal from '@/components/ui/modals/modalBase';

interface IErrorContext {
    throwError: (message: string, title?: string) => void;
}

interface ErrorMessage {
    message?: string;
    title?: string;
}

export const ErrorContext = createContext<IErrorContext>({
    throwError: () => {},
});

export function ErrorWrapper(props: React.PropsWithChildren) {
    const [{ errorMessages }, setErrorMessages] = useState<{
        errorMessages: Map<string, ErrorMessage>;
    }>({ errorMessages: new Map() });

    function throwError(message: string, title?: string) {
        if (
            Array.from(errorMessages.values()).filter(
                (e) => e.message === message
            ).length !== 0
        )
            return;

        let newId: string;

        do {
            newId = v4();
        } while (errorMessages.has(newId));

        errorMessages.set(newId, {
            message: message,
            title: title,
        });

        setErrorMessages({ errorMessages });
    }

    function closeModal(id: string) {
        errorMessages.delete(id);
        setErrorMessages({ errorMessages });
    }

    const errorModals: React.ReactNode[] = [];

    errorMessages.forEach(function createErrorModal({ message, title }, key) {
        errorModals.push(
            <ErrorModal
                title={ title ?? '' }
                key={ key }
                closeModal={ () => closeModal(key) }
            >
                { message || 'Unspecified error.' }
            </ErrorModal>
        );
    });

    return (
        <ErrorContext.Provider value={ { throwError } }>
            { errorModals }
            { props.children }
        </ErrorContext.Provider>
    );
}
