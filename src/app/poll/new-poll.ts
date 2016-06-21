import { Component, Input } from '@angular/core';
import {Http} from "@angular/http";
import * as Const from "../util/constants";
import { ErrorComponent, ErrorHandler } from '../error/error';
import {HeaderService} from "../util/header.service";
import {Poll} from '../poll/polls';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import { FormBuilder, Validators, ControlGroup } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: "new-poll",
  templateUrl: "new-poll.html",
  directives: [ErrorComponent, ROUTER_DIRECTIVES]
})
export class NewPollComponent extends ErrorHandler {

  private loginForm;
  private poll: Poll = new Poll();

  constructor(private http: Http, private router: Router, private headerService: HeaderService, private fb: FormBuilder) {
    super();

    this.loginForm = fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  private savePoll(event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.router.navigate(["polls"]);
    }
  }
}