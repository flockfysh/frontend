import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../contexts/userContext';

export default function PrivateRoutes() {
    const { curUser } = useContext(UserContext);

    if (curUser) return <Outlet />;

    return <Navigate to="/login" />;
}
