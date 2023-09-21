import { AUTH_SERVER_URL } from "@/settings";
import axios from "axios";

class Auth {
    static authApi = axios.create({
        baseURL: `${AUTH_SERVER_URL}/auth`
    });

    static async generateOTP(email:string){
        try {
            const res = await this.authApi.get<{data:string,success:boolean}>(`/verify`,{params:{email}})
            return res.data
        } catch (error) {
            return null
        }
    }

}

export default Auth