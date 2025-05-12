import { Injectable } from "@angular/core";
import { JwtDecodeModel } from "../../models/token/jwt.model";
import { Observable, ReplaySubject } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DataUrl, NgxImageCompressService } from "ngx-image-compress";

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor(
        private _sanitizer: DomSanitizer,
        private imageCompress: NgxImageCompressService
    ) {}

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

    convertFileToBase64(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => {
            if (event.target && event.target.result)
                result.next(btoa(event.target.result.toString()));
        }
        return result;
    }

    decodeBase64ImageFileToSecurityTrustResource(base64String: string): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl(base64String)
    }


}