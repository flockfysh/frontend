import { AUTH_SERVER_URL } from '@/settings';
import axios, { AxiosError, isAxiosError } from 'axios';
import api from './api';

class Auth {
    static authApi = axios.create({
        baseURL: `${AUTH_SERVER_URL}/auth`
    });

    static async generateOTP(email:string, errCb?:(val:string)=>void){
        try {
            const res = await api.get<{data:string, success:boolean}>(`/api/auth/2fa/init`, { params:{ email } });
            return res.data;
        }
 catch (error) {
            let msg = '';
            if(isAxiosError(error)){
                msg = error.response?.data.error.message;
            }
else{
                msg = (error as Error).message;
            }
            errCb && errCb(msg);
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
            const err = error as AxiosError;
            if(('code' in err) && err.code==='ERROR_MISSING_OTP_SECRET'){
                return null;
            }
            return false;
        }
    }

    static async login(mode:'signup'|'login'='login', data:User & {otp:string}, errCb?:(val:string)=>void){
        try {
            const { data:authData } = await api.post<{data:string, success:boolean}>(`/api/auth/${mode}`, data);
            return authData.success;

        }
 catch (error) {
            errCb&&errCb((error as Error).message);
            return false;
        }
    }

    static async forgot2fa(email:string, errCb?:(val:string)=>void){
        try {
            const { data:authData } = await api.post<{data:string, success:boolean}>(`/api/auth/2fa/forgot`, { email });
            return authData.success;

        }
 catch (error) {
            errCb&&errCb((error as Error).message);
            return false;
        }
    }

    static async resetOTP(email:string, token:string, errCb?:(val:string)=>void){
        try {
            const { data } = await api.post<{data:string, success:boolean}>('/api/auth/2fa/reset', { email, token });
            return data.success ? data.data: false;
        }
 catch (error) {
            errCb && errCb((error as Error).message);
            return false;
        }
    }

}

export default Auth;
