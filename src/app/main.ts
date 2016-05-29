import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

/// <reference path="../typings.d.ts" />

/**
 * Bootstraps the entire Angular2 application.
 */
bootstrap(AppComponent).then(
    success => console.log("App bootstrapped!"),
    error => console.log(error)
);