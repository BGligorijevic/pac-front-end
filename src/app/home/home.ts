import {Component, OnInit} from "@angular/core";
import {Login} from "../login/login";
import {User} from "../login/user";
import {Router} from "@angular/router";
import * as Const from "../config/constants";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.html"
})
export class Home implements OnInit {

    private loggedInUser: String;

    constructor(private login: Login, private router: Router) {
    }

    ngOnInit() {
        var loggedIn = this.login.isLoggedIn();
        
        if (loggedIn) {
            var loginData: Object = JSON.parse(localStorage.getItem(Const.STORAGE_USER_PARAM));
            this.loggedInUser = loginData['userName'];
        } else {
            this.router.navigate(["login"]);
        }
    }

    logout() {
        this.login.logout();
    }
}
