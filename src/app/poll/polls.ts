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

  onOptionVoted(pollOption: PollOption, pollModel: Poll) {
    event.preventDefault();

    let voteUrl = Const.VOTE_URL.replace("{pollId}", pollOption.pollId).replace("{optionId}", pollOption._id);
    this.http.post(voteUrl, '', { headers: this.headerService.getHeaders() })
      .map(response => response.json())
      .subscribe(
      pollResult => this.onVoteSuccess(pollModel, pollResult),
      err => this.handleError(err, "You can only vote once on the same poll.")
      );
  }

  private onVoteSuccess(pollModel: Poll, pollResult: Poll) {
    pollModel.pollOptions = pollResult.pollOptions;
    pollModel.voted = true;
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
  editable: boolean;
  deletable: boolean;
}

/**
 * Domain class representing Option.
 */
export class PollOption {
  _id: string;
  name: string;
  pollId: string;
  votes: Vote[];
  percentage: number;
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
