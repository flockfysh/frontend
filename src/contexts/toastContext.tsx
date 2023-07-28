import { PropsWithChildren, createContext } from 'react';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const enum ToastType {
    SUCCESS = 'success',
    WARN = 'warning',
    INFO = 'info',
    ERROR = 'error',
}

interface ToastContext {
    notify: (data: { toastType: ToastType; message: string }) => void;
}

export const ToastContext = createContext<ToastContext>({
    notify: (_data: { toastType: ToastType; message: string }) => {},
});

const toastOption: ToastOptions = {
    icon: false,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
};

export function ToastWrapper(props: PropsWithChildren) {
    function notify(data: { toastType: ToastType; message: string }) {
        switch (data.toastType) {
            case ToastType.INFO:
                toast.info(data.message, toastOption);
                break;
            case ToastType.SUCCESS:
                toast.success(data.message, toastOption);
                break;
            case ToastType.ERROR:
                toast.error(data.message, toastOption);
                break;
            case ToastType.WARN:
                toast.warning(data.message, toastOption);
                break;
            default:
                break;
        }
    }

    const curState = { notify };
    return (
        <ToastContext.Provider value={ curState }>
            { props.children }
            
            <ToastContainer
                limit={ 1 }
                newestOnTop={ true }
                closeOnClick
                pauseOnFocusLoss
            />
        </ToastContext.Provider>
    );
}
