import {Component, OnInit} from "@angular/core";
import {Login} from "../login/login";
import {User} from "../login/user";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import * as Const from "../config/constants";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.html"
})
export class Home implements OnInit {

    private loggedInUser: String;
    private headers: Headers;
    private token: string;

    constructor(private login: Login, private router: Router, private http: Http) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    ngOnInit() {
        var loggedIn = this.login.isLoggedIn();

        if (loggedIn) {
            var loginData: Object = JSON.parse(localStorage.getItem(Const.STORAGE_USER_PARAM));
            this.loggedInUser = loginData['userName'];
            this.token = loginData['token'];
            this.loadVotes();
        } else {
            this.router.navigate(["login"]);
        }
    }

    private loadVotes() {
        this.headers.append("Authorization", "Bearer " + this.token);

        this.http.get(Const.POLLS_URL, { headers: this.headers })
            .map(response => response.json())
            .subscribe(
            polls => this.displayPolls(polls),
            err => this.onFailed(err)
            );
    }

    logout() {
        this.login.logout();
    }

    private displayPolls(polls: any) {
        console.log(polls);
    }

    private onFailed(err) {
        console.error(err);
    }
}
