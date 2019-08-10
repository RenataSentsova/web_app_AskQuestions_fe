import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {AskInfo} from "./ask-info";
import {QuestionService} from "../shared/question.service";
import {Category} from "../shared/model/category";
import {Subcategory} from "../shared/model/subcategory";
import {UserService} from "../shared/user.service";
import {CategoryService} from "../shared/category.service";
import {SubcategoryService} from "../shared/subcategory.service";

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;

  form: any = {};

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategoryId: number;

  userId: number;
  userName: string;


  askInfo: AskInfo;
  isAsked = false;
  isAskFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private questionService: QuestionService,
              private userService: UserService, private categoryService: CategoryService,
              private subcategoryService: SubcategoryService) { }

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
      this.getUserId();
      this.getAllCategories();
    }
  }

  public getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        alert("Ошибка при загрузке категорий")
      }
    );
  }
  public selectCategory(category: Category){
    this.selectedCategory = category;
    this.subcategoryService.getSubcategoriesByCategory(category.id).subscribe(
      res => {
        this.subcategories = res;
      },
      err => {alert("Error loading subcategories")}
    )
  }
  public selectSubcategory(subcategory: Subcategory){
    this.selectedSubcategory = subcategory;
    this.subcategoryId = this.selectedSubcategory.id;
  }
  public getUserId(){
    this.userService.getUserIdByUserName(this.info.username).subscribe(
      res => {
        this.userId = res;
      },
      err => {
        alert("Error loading UserId")
      });
  }

  onSubmit() {
    console.log(this.form);
    this.askInfo = new AskInfo(
      this.form.topic,
      this.form.text,
      this.userId,
      this.subcategoryId);

    this.questionService.ask(this.askInfo).subscribe(
      data => {
        console.log(data);
        this.isAsked = true;
        this.isAskFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isAskFailed = true;
      }
    );
  }

}
