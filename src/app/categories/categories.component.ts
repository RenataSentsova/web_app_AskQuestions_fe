import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/model/category";
import {Subcategory} from "../shared/model/subcategory";
import {TokenStorageService} from "../shared/token-storage.service";
import {QuestionService} from "../shared/question.service";
import {UserService} from "../shared/user.service";
import {CategoryService} from "../shared/category.service";
import {SubcategoryService} from "../shared/subcategory.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  private roles: string[];
  private authority: string;
  info: any;

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  deletedSubcategories: Subcategory[] = [];
  selectedCategory: Category;

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
      this.getAllCategories();
      this.getAllSubcategories();
    }
  }

  public getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        alert("Error loading categories")
      }
    );
  }

  public getAllSubcategories(){
    this.subcategoryService.getAllSubcategories().subscribe(
      res => {
        this.subcategories = res;
      },
      err => {alert("Error loading subcategories")}
    )
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

  public getDeletedSubcategories(category: Category){
    this.subcategoryService.getSubcategoriesByCategory(category.id).subscribe(
      res => {
        this.deletedSubcategories = res;
      },
      err => {alert("Error loading subcategories")}
    )
  }

  public deleteCategory(category: Category) {
    if(confirm("Are you sure you want to delete a category?")){
      this.categoryService.deleteCategory(category.id).subscribe(
        res => {
          let indexOfCategory = this.categories.indexOf(category);
          this.categories.splice(indexOfCategory,1);
        },
        err => {
          alert("Could not delete category");
        }
      );
    }
  }

  public deleteSubcategory(subcategory: Subcategory) {
    if(confirm("Are you sure you want to delete the subcategory?")){
      this.subcategoryService.deleteSubcategory(subcategory.id).subscribe(
        res => {
          let indexOfCategory = this.subcategories.indexOf(subcategory);
          this.subcategories.splice(indexOfCategory,1);
        },
        err => {
          alert("Could not delete subcategory");
        }
      );
    }
  }
}

