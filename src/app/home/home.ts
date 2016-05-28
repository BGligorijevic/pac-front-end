import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../login/authentication.service";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.html"
})
export class Home implements OnInit {
    constructor(private authService:AuthenticationService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
    }

    logout() {
        this.authService.logout();
    }
}
