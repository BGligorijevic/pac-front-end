import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

/**
 * Bootstraps the entire Angular2 application.
 */
bootstrap(AppComponent).then(
    success => console.log("AppComponent bootstrapped!"),
    error => console.log(error)
);
