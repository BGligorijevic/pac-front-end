import {Headers} from "@angular/http";
import {Injectable} from "@angular/core";

/**
 * Header service.
 */
@Injectable()
export class HeaderService {

    private headers: Headers;

    constructor() {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    /**
     * This method should be used to get headers for back-end calls.
     * The headers will include authorization (token) data if user is already logged-in.
     * Otherwise, for first call (login), the token data will not be present.
     */
    public getHeaders(): Headers {
        return this.headers;
    }

    public addAuthorizationData(token: string): void {
        this.headers.set("Authorization", "Bearer " + token);
    }
}