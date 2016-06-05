import { HTTP_PROVIDERS } from "@angular/http";
import { FORM_PROVIDERS } from "@angular/common";
import { ROUTER_PROVIDERS } from "@angular/router";
import {Login} from "./login/login";

/**
 * Available providers to be used elsewhere.
 */
export const PROVIDERS = [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Login
];