import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {CategoryService} from "../shared/category.service";
import {SubcategoryService} from "../shared/subcategory.service";
import {QuestionService} from "../shared/question.service";
import {AnswerService} from "../shared/answer.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  info: any;

  categoriesCount: number;
  subcategoriesCount: number;
  questionsCount:number;
  answersCount:number;

  constructor(private token: TokenStorageService, private categoryService: CategoryService,
              private subcategoryService: SubcategoryService, private questionService: QuestionService,
              private answerService: AnswerService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(this.info.token) {
      this.getCountCategories();
      this.getCountSubcategories();
      this.getCountQuestions();
      this.getCountAnswers();
    }
  }

  public getCountCategories(){
    this.categoryService.findCount().subscribe(
      res => {
        this.categoriesCount = res;
      },
      err => {
        alert("Error loading categories")
      }
    );
  }

  public getCountSubcategories(){
    this.subcategoryService.findCount().subscribe(
      res => {
        this.subcategoriesCount = res;
      },
      err => {
        alert("Error loading subcategories")
      }
    );
  }

  public getCountQuestions(){
    this.questionService.findCount().subscribe(
      res => {
        this.questionsCount = res;
      },
      err => {
        alert("Error loading questions")
      }
    );
  }

  public getCountAnswers(){
    this.answerService.findCount().subscribe(
      res => {
        this.answersCount = res;
      },
      err => {
        alert("Error loading answers")
      }
    );
  }
}
