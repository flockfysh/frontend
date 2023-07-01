import React from 'react';

export function nestedLayout(
    parent: (page?: React.ReactNode) => React.ReactNode | undefined,
    child: (page?: React.ReactNode) => React.ReactNode | undefined,
) {

    return (page?: React.ReactNode) => parent(child(page));
}
