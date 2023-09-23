import { AUTH_SERVER_URL } from '@/settings';
import axios from 'axios';
import api from './api';

class Auth {
    static authApi = axios.create({
        baseURL: `${AUTH_SERVER_URL}/auth`
    });

    static async generateOTP(email:string){
        try {
            const res = await this.authApi.get<{data:string, success:boolean}>(`/verify`, { params:{ email } });
            return res.data;
        }
 catch (error) {
            return null;
        }
    }

    static async has2FA(){
        try {
            const res = await api.post<{data:string, success:boolean}>(`/api/auth/authenticated`);
            if(!res.data.success){
                throw new Error('Check failed');
            }
            return res.data.success;
        }
 catch (error) {
            return false;
        }
    }

}

export default Auth;
