import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export class User {
    constructor(public email:string,
                public password:string) {
    }
}

@Injectable()
export class AuthenticationService {

    users = [
        new User('admin@admin.com', 'adm9'),
        new User('user1@gmail.com', 'a23')
    ];

    constructor(private router:Router) {
    }

    logout() {
        localStorage.removeItem("user");
        this.router.navigate(['login']);
    }

    login(user:User) {
        // Here comes the real call to AUTH API service
        let authenticatedUser:User = this.users.find(u => (u.email === user.email && u.password === user.password));
        if (authenticatedUser) {
            localStorage.setItem("user", authenticatedUser.email);
            this.router.navigate(['/']);
            return true;
        }
        return false;
    }

    checkCredentials() {
        if (localStorage.getItem("user") === null) {
            this.router.navigate(['login']);
        }
    }
}