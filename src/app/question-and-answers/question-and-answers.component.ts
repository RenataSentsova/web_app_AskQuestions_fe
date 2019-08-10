import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../shared/question.service";
import {Question} from "../shared/model/question";
import {User} from "../shared/model/user";
import {AnswerService} from "../shared/answer.service";
import {Answer} from "../shared/model/answer";
import {TokenStorageService} from "../shared/token-storage.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-question-and-answers',
  templateUrl: './question-and-answers.component.html',
  styleUrls: ['./question-and-answers.component.css']
})

export class QuestionAndAnswersComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;

  questionId: number;
  userId: number;
  bestAnswerId: number;

  question: Question;
  users: User[] = [];
  answers: Answer[] = [];
  newAnswer: Answer;

  constructor(private route: ActivatedRoute,private questionService: QuestionService,
              private userService: UserService, private answerService: AnswerService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token){
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
      this.getAllUsers();

      this.route.params.subscribe(params => {
        this.questionId = params['questionId'];
      });

      this.getQuestion();
      this.getAnswers();
      this.getUserId();
      this.takeBestAnswerId();
    }
  }

  public getUserId(){
    this.userService.getUserIdByUserName(this.info.username).subscribe(
      res => {
        this.userId = res;
      },
      err => {
        alert("Error loading user id")
      });
  }

  public getQuestion(){
    this.questionService.findOne(this.questionId).subscribe(
      res => {
        this.question = res;
      },
      err => {alert("Error loading question")}
    )
  }

  public getAnswers(){
    this.answerService.findAllByQuestion(this.questionId).subscribe(
      res=>{
        this.answers = res;
      },
      err => {alert("Error loading responses")}
    )
  }

  public getAllUsers(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {alert("Error loading users")}
    )
  }

  public getLogin(userId: number){
    return this.users.find(x => x.id === userId).login;
  }

  public deleteAnswer(answer: Answer) {
    if(confirm("Are you sure you want to delete the answer?")){
      this.answerService.deleteAnswer(answer.id).subscribe(
        res => {
          let indexOfAnswer = this.answers.indexOf(answer);
          this.answers.splice(indexOfAnswer,1);
        },
        err => {
          alert("Failed to delete answer");
        }
      );
    }
  }

  public takeBestAnswerId(){
      this.questionService.takeBestAnswerId(this.questionId).subscribe(
        res => {
          this.bestAnswerId = res;
        },
        err => {
          alert("Error getting id of best answer");
        }
      );
  }

  public makeBest(answer: Answer) {
    this.newAnswer = answer;
    if(answer.isBest=="false") this.newAnswer.isBest = "true";
    else this.newAnswer.isBest = "false";
    if(confirm("Make answer better / deselect best answer?")){
      this.answerService.changeBest(answer).subscribe(
        res => {
          let indexOfAnswer = this.answers.indexOf(answer);
          this.answers.splice(indexOfAnswer,1);
          this.answers.splice(indexOfAnswer, 0, this.newAnswer);
        },
        err => {
          alert("Failed to change response status");
        }
      );
    }
    window.location.reload();
  }

}
