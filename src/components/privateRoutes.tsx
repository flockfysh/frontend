import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../contexts/userContext';

export default function PrivateRoutes() {
    const { isLoggedIn } = useContext(UserContext);

    if (isLoggedIn === true) return <Outlet />;

    return <Navigate to="/login" />;
}
