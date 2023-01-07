import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../contexts/userContext';

export default function PrivateRoutes() {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn === true) {
    return <Outlet />;
  } else if (loggedIn === false) {
    return <Navigate to="/login" />;
  } else {
    return null;
  }
}
