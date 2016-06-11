import { Component, Input } from '@angular/core';
import {Http} from "@angular/http";
import * as Const from "../util/constants";
import { ErrorComponent, ErrorHandler } from '../error/error';
import {HeaderService} from "../util/header.service";

@Component({
  moduleId: module.id,
  selector: "polls",
  templateUrl: "polls.html",
  directives: [ErrorComponent]
})
export class PollsComponent extends ErrorHandler {

  @Input("model")
  polls: Poll[];

  constructor(private http: Http, private headerService: HeaderService) {
    super();
  }

  onOptionVoted(pollOption: PollOption, poll: Poll) {
    event.preventDefault();

    let voteUrl = Const.VOTE_URL.replace("{pollId}", pollOption.pollId).replace("{optionId}", pollOption._id);
    this.http.post(voteUrl, '', { headers: this.headerService.getHeaders() })
      .map(response => response)
      .subscribe(
      response => this.onVoteSuccess(pollOption, poll),
      err => this.handleError(err, "You can only vote once on the same poll.")
      );
  }

  private onVoteSuccess(pollOption: PollOption, poll: Poll) {
    pollOption.voted = true;
    poll.voted = true;
    this.removeErrorMessage();
  }
}

/**
 * Domain class representing Poll.
 */
export class Poll {
  _id: string;
  title: string;
  description: string;
  authorId: string;
  changeDate: Date;
  pollOptions: PollOption[];
  voted: boolean;
}

/**
 * Domain class representing Option.
 */
export class PollOption {
  _id: string;
  name: string;
  pollId: string;
  votes: Vote[];
  voted: boolean;
}

/**
 * Domain class representing Vote.
 */
export class Vote {
  _id: string;
  user: string;
  optionId: string;
  changeDate: Date;
}
