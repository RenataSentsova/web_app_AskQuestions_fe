import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/token-storage.service';
import {User} from "../shared/model/user";
import {Question} from "../shared/model/question";
import {QuestionService} from "../shared/question.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;

  users: User[] = [];
  questions: Question[] = [];
  userId: number;

  constructor(private token: TokenStorageService, private questionService: QuestionService,
              private userService: UserService) { }

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
    }
  }

  delete(login: string) {
    if (confirm("Are you sure?")) {
      this.userService.deleteUser(login).subscribe(
        res => {
          this.logout();
        },
        err => {
          alert("Failed to change response status");
        }
      );
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  public deleteQuestion(question: Question) {
    if(confirm("Are you sure you want to delete the question?")){
      this.questionService.deleteQuestion(question.id).subscribe(
        res => {
          let indexOfQuestion = this.questions.indexOf(question);
          this.questions.splice(indexOfQuestion,1);
        },
        err => {
          alert("Failed to delete the question");
        }
      );
    }
  }

  public getAllUsers(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {alert("Error loading users")}
    )
  }

  public getName(username: string){
    return this.users.find(x => x.login === username).name;
  }

  public getUserId(username: string){
    this.userId = this.users.find(x => x.login === username).id;
    this.getQuestionsByUserId();
  }

  public getQuestionsByUserId(){
    this.questionService.getQuestionsByUserId(this.userId).subscribe(
      res => {
        this.questions = res;
      },
      err => {alert("Error loading questions")}
    )
  }

  public getEmail(username: string){
    return this.users.find(x => x.login === username).email;
  }

  public getNbQuestions(username: string){
    return this.users.find(x => x.login === username).nbQuestions;
  }

  public getNbAnswers(username: string){
    return this.users.find(x => x.login === username).nbAnswers;
  }
}
