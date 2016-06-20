import {Component, OnInit} from "@angular/core";
import {LoginComponent, User, Role} from "../login/login";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {PollsComponent, Poll} from '../poll/polls';
import {ErrorComponent, ErrorHandler} from '../error/error';
import {HeaderService} from "../util/header.service"
import * as Const from "../util/constants";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.html",
    directives: [PollsComponent, ErrorComponent]
})
export class HomeComponent extends ErrorHandler implements OnInit {

    private loggedInUser: User = new User();
    private polls: Poll[];

    constructor(private login: LoginComponent, private router: Router,
        private http: Http, private headerService: HeaderService) {
        super();
    }

    ngOnInit() {
        var loggedIn = this.login.isLoggedIn();

        if (loggedIn) {
            this.loggedInUser = this.login.getUserFromLocalStorage();
            this.headerService.addAuthorizationData(this.loggedInUser.token);

            this.loadPolls();
        } else {
            this.router.navigate(["login"]);
        }
    }

    private loadPolls() {
        this.http.get(Const.POLLS_URL, { headers: this.headerService.getHeaders() })
            .map(response => response.json())
            .subscribe(
            polls => this.displayPolls(polls),
            err => this.handleError(err, "An error occured while loading polls.")
            );
    }

    displayPolls(polls: Poll[]) {
        this.polls = polls;

        polls.forEach(poll => {
            this.updatePermissions(poll);

            poll.pollOptions.forEach(option => {
                option.votes.forEach(vote => {
                    if (vote.user === this.loggedInUser.userName) {
                        poll.voted = true;
                    }
                });
            });
        });
    }

    private updatePermissions(poll: Poll): void {
        if (this.allowedToChangeOrDelete(poll)) {
            poll.editable = true;
            poll.deletable = true;
        }
    }

    private allowedToChangeOrDelete(poll: Poll): boolean {
        return Const.ADMINISTRATOR === this.loggedInUser.role || this.loggedInUser.userName === poll.creator;
    }

    logout() {
        this.login.logout();
    }
}
