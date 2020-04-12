import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../shared/question.service";
import {Question} from "../shared/model/question";
import {AddAnswerInfo} from "./add-answer-info";
import {AnswerService} from "../shared/answer.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  info: any;
  questionId: number;
  question: Question;
  userId: number;

  form: any = {};
  addInfo: AddAnswerInfo;
  isAdded = false;
  isAddFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private route: ActivatedRoute,
              private questionService: QuestionService, private userService: UserService,
              private answerService: AnswerService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token) {
      this.route.params.subscribe(params => {
        this.questionId = params['questionId'];
      });
      this.getQuestion();
      this.getUserId();
    }
  }

  public getQuestion() {
    this.questionService.findOne(this.questionId).subscribe(
      res => {
        this.question = res;
      },
      err => {alert("Error loading question");}
    );
  }
  public getUserId(){
    this.userService.getUserIdByUserName(this.info.username).subscribe(
      res => {
        this.userId = res;
      },
      err => {
        alert("Error loading categories");
      });
  }

  onSubmit() {
    console.log(this.form);
    this.addInfo = new AddAnswerInfo(
      this.form.text,
      this.userId,
      this.questionId);

    this.answerService.addAnswer(this.addInfo).subscribe(
      data => {
        console.log(data);
        this.isAdded = true;
        this.isAddFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isAddFailed = true;
      }
    );
  }
}
