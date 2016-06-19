import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {HeaderService} from "../util/header.service";
import {ErrorComponent, ErrorHandler} from '../error/error';
import * as Const from "../util/constants";
import "rxjs/add/operator/map";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.html",
    directives: [ROUTER_DIRECTIVES, ErrorComponent]
})
export class LoginComponent extends ErrorHandler {

    private user: User = new User();

    constructor(private http: Http, private router: Router, private headerService: HeaderService) {
        super();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem(Const.STORAGE_USER_PARAM) !== null;
    }

    login() {
        this.http.post(Const.LOGIN_URL, JSON.stringify(this.user), { headers: this.headerService.getHeaders() })
            .map(response => response.json())
            .subscribe(
            user => this.onLoginSuccess(user),
            err => this.handleError(err, "Invalid credentials. Please try again.")
            );
    }

    logout(): void {
        localStorage.removeItem(Const.STORAGE_USER_PARAM);
        this.router.navigate(["login"]);
    }

    private onLoginSuccess(user: User): void {
        localStorage.setItem(Const.STORAGE_USER_PARAM, JSON.stringify(user));
        this.router.navigate(["/polls"]);
    }

    public getUserFromLocalStorage(): User {
        return JSON.parse(localStorage.getItem(Const.STORAGE_USER_PARAM));
    }
}

/**
 * Domain class representing user.
 */
export class User {
    userName: string;
    token: string;
    role: Role;
}

/**
 * Domain enum representing role.
 */
export enum Role {
    USER,
    ADMINISTRATOR
}
