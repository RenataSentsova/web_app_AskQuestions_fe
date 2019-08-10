import {Component, OnInit} from '@angular/core';
import {Question} from "../shared/model/question";
import {ActivatedRoute} from "@angular/router";
import {User} from "../shared/model/user";
import {SubcategoryService} from "../shared/subcategory.service";
import {TokenStorageService} from "../shared/token-storage.service";
import {QuestionService} from "../shared/question.service";
import {UserService} from "../shared/user.service";
import {CategoryService} from "../shared/category.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private roles: string[];
  private authority: string;
  info: any;

  subcategoryId: number;
  userId: number;

  questions: Question[] = [];
  users: User[] = [];
  nameSubcat: string;

  constructor(private route: ActivatedRoute, private token: TokenStorageService,
              private userService: UserService, private categoryService: CategoryService,
              private subcategoryService: SubcategoryService, private questionService: QuestionService) { }

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
        this.subcategoryId = params['subcategoryId'];
      });
      this.getUserId();
      this.getQuestionsBySubcategoryId();
      this.getNameSubcat();
    }
  }

  public getUserId(){
    this.userService.getUserIdByUserName(this.info.username).subscribe(
      res => {
        this.userId = res;
      },
      err => {
        alert("Error loading categories")
      });
  }

  public getQuestionsBySubcategoryId(){
    this.questionService.getQuestionsBySubcategory(this.subcategoryId).subscribe(
      res => {
        this.questions = res;
      },
      err => {alert("Error loading questions")}
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

  public getNameSubcat(){
    this.subcategoryService.getNameSubcatById(this.subcategoryId).subscribe(
      res => {
        this.nameSubcat = res;
      },
      err => {alert("Error loading subcategory name")}
    )
  }

  public deleteQuestion(question: Question) {
    if(confirm("Are you sure you want to delete the question?")){
      this.questionService.deleteQuestion(question.id).subscribe(
        res => {
          let indexOfQuestion = this.questions.indexOf(question);
          this.questions.splice(indexOfQuestion,1);
        },
        err => {
          alert("Failed to delete the question.");
        }
      );
    }
  }

}
