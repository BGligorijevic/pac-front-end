/**
 * Commonly used Constants.
 */
export const SERVER_BASE_URL: string = "http://localhost:8080/";
export const LOGIN_URL: string = SERVER_BASE_URL + "user/login";
export const POLLS_URL: string = SERVER_BASE_URL + "api/polls/";
export const DELETE_POLL_URL: string = POLLS_URL + "{pollId}";
export const VOTE_URL: string = POLLS_URL + "vote/{pollId}/{optionId}";
export const STORAGE_USER_PARAM: string = "user";
export const NO_RESPONSE: number = 3;
export const USER: string = "USER";
export const ADMINISTRATOR: string = "ADMINISTRATOR";