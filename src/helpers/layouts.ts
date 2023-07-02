import { ReactNode } from 'react';

export function nestedLayout(
    parent: (page?: ReactNode) => ReactNode | undefined,
    child: (page?: ReactNode) => ReactNode | undefined
) {
    return (page?: ReactNode) => parent(child(page));
}
