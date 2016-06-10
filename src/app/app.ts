import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";

import {HomeComponent} from "./home/home";
import {LoginComponent} from "./login/login";
import {PROVIDERS} from "./providers";

@Component({
    moduleId: module.id,
    selector: "app",
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [PROVIDERS]
})
@Routes([
    { path: "/", component: HomeComponent },
    { path: "/polls", component: HomeComponent },
    { path: "/login", component: LoginComponent }
])
export class AppComponent {

    constructor(private router: Router) {
    }
}