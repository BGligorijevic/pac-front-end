import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {User} from "./user";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.html",
    directives: [ROUTER_DIRECTIVES]
})
export class Login {
    private user:User;

    constructor(private _authService:AuthenticationService) {
        this.user = new User();
    }

    login() {
        this._authService.login(this.user);
    }
}
