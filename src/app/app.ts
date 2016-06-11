import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes, Router} from "@angular/router";
import {HomeComponent} from "./home/home";
import {LoginComponent} from "./login/login";
import {HTTP_PROVIDERS} from "@angular/http";
import {FORM_PROVIDERS} from "@angular/common";
import {HeaderService}  from "./util/header.service";

@Component({
    moduleId: module.id,
    selector: "app",
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [FORM_PROVIDERS, ROUTER_PROVIDERS, HTTP_PROVIDERS, LoginComponent, HeaderService]
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

