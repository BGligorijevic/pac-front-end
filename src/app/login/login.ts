import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {User, AuthenticationService} from "./authentication.service";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Login {
    public user = new User('', '');
    public errorMsg = '';

    constructor(private _service:AuthenticationService) {
    }

    login() {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
        }
    }

    /*     constructor(public router:Router, public http:Http) {
     }

     login(event:Event, username:String, password:String) {
     event.preventDefault();
     let body = JSON.stringify({username, password});

     let contentHeaders = new Headers();
     contentHeaders.append('Accept', 'application/json');
     contentHeaders.append('Content-Type', 'application/json');

     this.http.post('http://localhost:8080/user/login', body, {headers: contentHeaders})
     .subscribe(
     response => {
     localStorage.setItem('jwt', response.json().id_token);
     this.router.navigate(['home']);;
     },
     error => {
     alert(error.text());
     console.log(error.text());
     }
     );
     }*/
}
