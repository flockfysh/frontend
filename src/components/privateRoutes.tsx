import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {UserContext} from '../contexts/userContext';

export default function PrivateRoutes() {
    const {loggedIn} = useContext(UserContext);

    if (loggedIn === true) {
        return <Outlet/>;
    }

    return <Navigate to="/login"/>;
}
