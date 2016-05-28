import { HTTP_PROVIDERS } from "@angular/http";
import { FORM_PROVIDERS } from "@angular/common";
import { ROUTER_PROVIDERS } from "@angular/router";
import {AuthenticationService} from "./login/authentication.service";
/**
 * Available providers to be used elsewhere.
 */
export const PROVIDERS = [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AuthenticationService
];