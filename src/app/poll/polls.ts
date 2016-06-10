import { Component, Input } from '@angular/core';
import {Http, Headers} from "@angular/http";
import * as Const from "../util/constants";
import { ErrorComponent, ErrorHandler } from '../error/error';

@Component({
  moduleId: module.id,
  selector: "polls",
  templateUrl: "polls.html",
  directives: [ErrorComponent]
})
export class PollsComponent extends ErrorHandler {

  @Input("model")
  polls: Poll[];

  private headers: Headers;

  constructor(private http: Http) {
    super();
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
  }

  onOptionVoted(pollId: string, optionId: string) {
    event.preventDefault();

    var loginData: Object = JSON.parse(localStorage.getItem(Const.STORAGE_USER_PARAM));
    this.headers.set("Authorization", "Bearer " + loginData['token']);

    let voteUrl = Const.VOTE_URL.replace("{pollId}", pollId).replace("{optionId}", optionId);
    this.http.post(voteUrl, '', { headers: this.headers })
      .map(response => response)
      .subscribe(
      polls => this.onVoteSuccess(),
      err => this.handleError(err, "Vote could not be made.")
      );
  }

  private onVoteSuccess() {
    console.log("Voted successfully");
  }
}

/**
 * Domain class representing Poll.
 */
export class Poll {
    _id: string;
    description: string;
    pollOptions: PollOption[];
}

/**
 * Domain class representing Option.
 */
export class PollOption {
    _id: string;
    name: string;
    voted: boolean;
}
