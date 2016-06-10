import { Component, Input } from '@angular/core';
import {Http, Headers} from "@angular/http";
import * as Const from "../util/constants";

@Component({
    moduleId: module.id,
    selector: "error",
    templateUrl: "error.html"
})
export class ErrorComponent {

    @Input("model")
    errorMessage: string;
}

/**
 * Component which helps with handling errors.
 */
export class ErrorHandler {
    protected errorMessage: String;

    protected handleError(err, customMessage: string) {
        if (Const.NO_RESPONSE === err.type) {
            this.errorMessage = "Server unavailable.";
        } else {
            this.errorMessage = customMessage;
        }
    }
}