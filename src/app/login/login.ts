import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import * as Const from "../config/constants";
import {User} from "./user";

import "rxjs/add/operator/map";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.html",
    directives: [ROUTER_DIRECTIVES]
})
export class Login {

    private user: User;
    private errorMsg: String;
    private headers: Headers;

    constructor(private http: Http, private router: Router) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
        this.user = new User();
    }

    isLoggedIn() : boolean {
        return localStorage.getItem(Const.STORAGE_USER_PARAM) !== null;
    }

    login() {
        this.http.post(Const.LOGIN_URL, JSON.stringify(this.user), { headers: this.headers })
            .map(response => response.text())
            .subscribe(
            token => this.onLoginSuccess(token),
            err => this.onLoginFailed()
            );
    }

    logout() {
        localStorage.removeItem(Const.STORAGE_USER_PARAM);
        this.router.navigate(["login"]);
    }

    private onLoginSuccess(token: string) {
        this.errorMsg = "";
        
        var user = {
            userName: this.user.userName,
            token: token
        };
        localStorage.setItem(Const.STORAGE_USER_PARAM, JSON.stringify(user));

        this.router.navigate(["/"]);
    }

    private onLoginFailed() {
        this.errorMsg = "Invalid credentials. Please try again.";
    }
}