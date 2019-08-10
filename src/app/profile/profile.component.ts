import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../shared/model/user";
import {QuestionService} from "../shared/question.service";
import {Question} from "../shared/model/question";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  info: any;

  userId: number;
  user: User;

  questions: Question[] = [];

  constructor(private token: TokenStorageService, private route: ActivatedRoute,
              private userService: UserService, private questionService: QuestionService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token) {
      this.route.params.subscribe(params => {
        this.userId = params['userId'];
      });
      this.getUserByUserId();
      this.getQuestionsByUserId();
    }
  }

  public getUserByUserId(){
    this.userService.getUserById(this.userId).subscribe(
      res => {
        this.user = res;
      },
      err => {alert("Error loading user")}
    )
  }

  public getQuestionsByUserId(){
    this.questionService.getQuestionsByUserId(this.userId).subscribe(
      res => {
        this.questions = res;
      },
      err => {alert("Error loading questions")}
    )
  }
}
