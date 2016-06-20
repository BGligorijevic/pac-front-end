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
  private pollToRestore: Poll = new Poll();

  constructor(private http: Http, private headerService: HeaderService) {
    super();
  }

  public onOptionVoted(pollOption: PollOption, pollModel: Poll) {
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

  public turnOnEditingMode(poll: Poll): void {
    this.copy(poll, this.pollToRestore);

    if (poll.editable) {
      poll.inEditingMode = true;
    }
  }

  private turnOffEditingMode(poll: Poll): void {
    poll.inEditingMode = false;
  }

  public save(pollModel: Poll): void {
    this.http.put(Const.POLLS_URL, JSON.stringify(pollModel), { headers: this.headerService.getHeaders() })
      .map(response => response.json())
      .subscribe(
      pollResult => this.onEditPollSuccess(pollModel, pollResult),
      err => this.handleError(err, "Edit poll failed.")
      );
  }

  public remove(pollModel: Poll): void {
    let result = confirm("Are you sure you wish to delete \"" + pollModel.title + "\"");
    if (!result) {
      return
    }

    let voteUrl = Const.DELETE_POLL_URL.replace("{pollId}", pollModel._id);
    this.http.delete(voteUrl, { headers: this.headerService.getHeaders() })
      .map(response => response.text())
      .subscribe(
      result => this.onDeletePollSuccess(pollModel),
      err => this.handleError(err, "Delete poll failed.")
      );
  }

  private onEditPollSuccess(pollModel: Poll, pollResult: Poll) {
    this.turnOffEditingMode(pollModel);
  }

  private onDeletePollSuccess(pollModel: Poll) {
    this.polls.splice(this.polls.indexOf(pollModel), 1);
    this.turnOffEditingMode(pollModel);
  }

  public discard(poll: Poll): void {
    this.copy(this.pollToRestore, poll);
    this.turnOffEditingMode(poll);
  }

  private copy(from: Poll, to: Poll): void {
    to.title = from.title;
    to.description = from.description;
    to.pollOptions = from.pollOptions;
  }
}

/**
 * Domain class representing Poll.
 */
export class Poll {
  _id: string;
  title: string;
  description: string;
  creator: string;
  changeDate: Date;
  pollOptions: PollOption[];
  voted: boolean;
  editable: boolean;
  deletable: boolean;
  inEditingMode: boolean;
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
