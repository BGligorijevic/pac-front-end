import { Component, Input } from '@angular/core';
import {Http} from "@angular/http";
import * as Const from "../util/constants";
import { ErrorComponent, ErrorHandler } from '../error/error';
import {HeaderService} from "../util/header.service";
import {Poll, PollOption} from '../poll/polls';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "new-poll",
  templateUrl: "new-poll.html",
  directives: [ErrorComponent, ROUTER_DIRECTIVES]
})
export class NewPollComponent extends ErrorHandler {

  private poll: Poll = new Poll();
  private valid: boolean;

  constructor(private http: Http, private router: Router, private headerService: HeaderService) {
    super();

    this.addOption();
    this.addOption();
  }

  private validate(): void {
    if (this.poll.title.length !== 0 && this.optionsValid()) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  private optionsValid(): boolean {
    if (this.poll.pollOptions.length < 2) {
      return false;
    }

    for (var index = 0; index < this.poll.pollOptions.length; index++) {
      var option = this.poll.pollOptions[index];
      if (option.name.length === 0) {
        return false;
      }
    }

    return true;
  }

  private addOption(): void {
    this.poll.pollOptions.push(new PollOption());
  }

  private removeOption(pollOption: PollOption): void {
    if (pollOption.name.length !== 0) {
      let result = confirm("Remove \"" + pollOption.name + "\"?");
      if (!result) {
        return;
      }
    }

    this.poll.pollOptions.splice(this.poll.pollOptions.indexOf(pollOption), 1);
    this.validate();
  }

  private savePoll(event) {
    event.preventDefault();

    this.http.post(Const.POLLS_URL, JSON.stringify(this.poll), { headers: this.headerService.getHeaders() })
      .map(response => response.json())
      .subscribe(
      pollResult => this.onSavePollSuccess(),
      err => this.handleError(err, "Saving poll failed.")
      );
  }

  private onSavePollSuccess(): void {
    this.router.navigate(["polls"]);
  }
}