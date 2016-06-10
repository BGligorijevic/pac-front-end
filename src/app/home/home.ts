import {Component, OnInit} from "@angular/core";
import {LoginComponent, User} from "../login/login";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http";
import { PollsComponent, Poll } from '../poll/polls';
import { ErrorComponent, ErrorHandler } from '../error/error';
import * as Const from "../util/constants";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.html",
    directives: [PollsComponent, ErrorComponent]
})
export class HomeComponent extends ErrorHandler implements OnInit {

    private loggedInUser: string;
    private headers: Headers;
    private token: string;
    private polls: Poll[];

    constructor(private login: LoginComponent, private router: Router, private http: Http) {
        super();
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
            this.headers.set("Authorization", "Bearer " + this.token);

            this.loadVotes();
        } else {
            this.router.navigate(["login"]);
        }
    }

    private loadVotes() {
        this.http.get(Const.POLLS_URL, { headers: this.headers })
            .map(response => response.json())
            .subscribe(
            polls => this.polls = polls,
            err => this.handleError(err, "An error occured while loading polls.")
            );
    }

    logout() {
        this.login.logout();
    }
}
