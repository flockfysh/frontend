import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';
import Button from '../UI/button/button';
import classes from './logout.module.css';
import { UserContext } from '../../contexts/userContext';

export default function Logout() {
    const navigate = useNavigate();
    const { refreshUserState } = React.useContext(UserContext);
    
    async function logout() {
        await api.get('/logout');
        refreshUserState();
        navigate('/');
    }

    return (
        <Button gradient={ true } onClick={ logout } className={ classes.logout }>
            Logout
        </Button>
    );
}

