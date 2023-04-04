import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/button/button';

import { UserContext } from '../../contexts/userContext';
import api from '../../helpers/api';

import classes from './logout.module.css';

export default function Logout(props: { closeError?: () => void }) {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    async function logout() {
        await api.get('/api/auth/logout');
        setUser(null);
        navigate('/');
        props.closeError?.();
    }

    return (
        <Button gradient={ true } onClick={ logout } className={ classes.logout }>
            Logout
        </Button>
    );
}

