import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useState
} from 'react';

interface IModalContext {
    isCreatePostOpen: boolean,
    isEditPostOpen: boolean,
    setCreatePostOpen: Dispatch<SetStateAction<boolean>>,
    setEditPostOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<IModalContext>({
    isCreatePostOpen: false,
    isEditPostOpen: false,
    setCreatePostOpen: () => {},
    setEditPostOpen: () => {}
});

export const ModalWrapper = (props: PropsWithChildren) => {
    const [isCreatePostOpen, setCreatePostOpen] = useState<boolean>(false);
    const [isEditPostOpen, setEditPostOpen] = useState<boolean>(false);

    return (
        <ModalContext.Provider
            value={{
                isCreatePostOpen,
                isEditPostOpen,
                setCreatePostOpen,
                setEditPostOpen
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
};
