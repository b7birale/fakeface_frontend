import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(
        private router: Router,
    ){}

    canActivate(): boolean {
        const userId = localStorage.getItem("id");
        if(userId){
            return true;
        } else {
            this.router.navigateByUrl("/login");
            return false;
        }
    }
}