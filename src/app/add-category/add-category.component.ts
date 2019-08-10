import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../shared/token-storage.service";
import {AddCategoryInfo} from "./add-category-info";
import {CategoryService} from "../shared/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;

  form: any = {};

  addInfo: AddCategoryInfo;
  isAdded = false;
  isAddFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private categoryService: CategoryService) { }

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
    }
  }
  onSubmit() {
    console.log(this.form);
    this.addInfo = new AddCategoryInfo(
      this.form.name);

    this.categoryService.addCategory(this.addInfo).subscribe(
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
