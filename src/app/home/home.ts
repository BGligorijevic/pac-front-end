import {Component} from '@angular/core';
import {AuthenticationService} from "../login/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.html'
})
export class Home {
    constructor(private service:AuthenticationService) {
    }

    ngOnInit() {
        this.service.checkCredentials();
    }

    logout() {
        this.service.logout();
    }
}
