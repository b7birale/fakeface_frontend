import { Injectable } from "@angular/core";
import { JwtDecodeModel } from "../../models/token/jwt.model";

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor() {}

    decodeToken(token: string): JwtDecodeModel {
        const _decodeToken = (token: string) => {
            try {
                const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
                const decoded = atob(base64);
                return JSON.parse(decodeURIComponent(escape(decoded)));
            } catch {
                return;
            }
        };
    
        return token
            .split('.')
            .map(token => _decodeToken(token))
            .reduce((acc, curr) => {
                if (!!curr) acc = { ...acc, ...curr };
                return acc;
            }, Object.create(null));
    }

    decodeTokenExpired(exp: number) {
        return new Date(exp * 1000);
    }

}