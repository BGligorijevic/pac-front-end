import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";

import {Home} from "./home/home";
import {Login} from "./login/login";
import {PROVIDERS} from "./providers";

@Component({
    moduleId: module.id,
    selector: "app",
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [PROVIDERS]
})
@Routes([
    {path: "/", component: Home},
    {path: "/login", component: Login},
])
export class AppComponent {

    constructor(private router:Router) {
    }
}