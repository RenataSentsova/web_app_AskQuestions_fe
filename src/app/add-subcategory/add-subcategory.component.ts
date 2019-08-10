import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {AddSubcategoryInfo} from "./add-subcategory-info";
import {SubcategoryService} from "../shared/subcategory.service";
import {Category} from "../shared/model/category";
import {CategoryService} from "../shared/category.service";

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;

  form: any = {};

  categories: Category[] = [];
  selectedCategory: Category;
  categoryId: number;

  addInfo: AddSubcategoryInfo;
  isAdded = false;
  isAddFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private subcategoryService: SubcategoryService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token) {
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
  public selectCategory(category: Category){
    this.selectedCategory = category;
    this.categoryId = this.selectedCategory.id;
  }

  onSubmit() {
    console.log(this.form);
    this.addInfo = new AddSubcategoryInfo(
      this.form.name,
      this.categoryId);

    this.subcategoryService.addSubcategory(this.addInfo).subscribe(
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
