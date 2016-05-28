import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import {User} from "./user";
import "rxjs/add/operator/map";
import {LOGIN_URL} from "../config/constants";

@Injectable()
export class AuthenticationService {

    private headers:Headers;

    constructor(private http:Http, private router:Router) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    checkCredentials() {
        if (localStorage.getItem("token") === null) {
            this.router.navigate(["login"]);
        }
    }

    login(user:User) {
        this.http.post(LOGIN_URL, JSON.stringify(user), {headers: this.headers})
            .map(response => response.text())
            .subscribe(
                token => this.onLoginSuccess(token),
                err => this.onLoginFailed()
            );
    }

    onLoginSuccess(token:string) {
        localStorage.setItem("token", token);
        this.router.navigate(["/"]);
    }

    onLoginFailed() {
        console.error("Error!");
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(["login"]);
    }
}