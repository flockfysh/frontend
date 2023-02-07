import React from 'react';

export default function Test() {
    React.useEffect(() => {
        // @ts-ignore
        if (window.requestFileSystem) {
            console.log('File system API 1');
        }
        // @ts-ignore
        if (window.webkitRequestFileSystem) {
            console.log('File system API 2');
        }
    });

    return (<div>

    </div>);
}