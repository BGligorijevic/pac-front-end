import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import * as Const from "../util/constants";
import { ErrorComponent, ErrorHandler } from '../error/error';
import "rxjs/add/operator/map";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.html",
    directives: [ROUTER_DIRECTIVES, ErrorComponent]
})
export class LoginComponent extends ErrorHandler {

    private user: User;
    private headers: Headers;

    constructor(private http: Http, private router: Router) {
        super();
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
        this.user = new User();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem(Const.STORAGE_USER_PARAM) !== null;
    }

    login() {
        this.http.post(Const.LOGIN_URL, JSON.stringify(this.user), { headers: this.headers })
            .map(response => response.text())
            .subscribe(
            token => this.onLoginSuccess(token),
            err => this.handleError(err, "Invalid credentials. Please try again.")
            );
    }

    logout() {
        localStorage.removeItem(Const.STORAGE_USER_PARAM);
        this.router.navigate(["login"]);
    }

    private onLoginSuccess(token: string) {
        var user = {
            userName: this.user.userName,
            token: token
        };
        localStorage.setItem(Const.STORAGE_USER_PARAM, JSON.stringify(user));

        this.router.navigate(["/polls"]);
    }
}

/**
 * Domain class representing user.
 */
export class User {
    userName: string;
    password: string;
}
