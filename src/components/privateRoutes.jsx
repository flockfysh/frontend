import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../userContext';

export default function PrivateRoutes(props) {
    const { loggedIn } = useContext(UserContext);

    return (
        loggedIn ? <Outlet /> : <Navigate to="/login" />
    );
}