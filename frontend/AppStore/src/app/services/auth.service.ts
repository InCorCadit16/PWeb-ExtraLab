import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

const token_name = "JWT_TOKEN";
const refresh_name = "REFRESH_TOKEN";

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private _api: ApiService) {

    }

    login(result: any) {
        localStorage.setItem(token_name, result.access);
        localStorage.setItem(refresh_name, result.refresh);
    }

    refresh() {
        
    }

    logout() {
        localStorage.removeItem(token_name);
        localStorage.removeItem(refresh_name);
    }

    get isLoggedIn() {
        const token = localStorage.getItem(token_name);
        return token != null;
    }

    get userInfo() {
        const token = localStorage.getItem(token_name);
        
        if (token != null) {
            const data = JSON.parse(atob(token?.split('.')[1]));
            return {
                userId: data['user_id'],
                username: data['username'],
                email: data['email'],
                role: data['role'],
            }
        }

        return null;
    }

    get refreshToken() {
        const refresh = localStorage.getItem(refresh_name);
        return refresh ? refresh : '';
    }

    get isPublisher() {
        return this.userInfo?.role === 'Publisher';
    }
}