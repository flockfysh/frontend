import React from 'react';

interface ReloadBlockerProps {
    message: string;
}

export default function ReloadBlocker(props: ReloadBlockerProps) {
    React.useEffect(() => {
        function messageHandler() {
            return props.message;
        }
        
        window.addEventListener('beforeunload', messageHandler);

        return () => window.removeEventListener('beforeunload', messageHandler);
    }, [props.message]);

    return null;
}
