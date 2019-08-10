import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddCategoryInfo} from "../add-category/add-category-info";
import {Category} from "./model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_URL ="http://localhost:8080";
  private ALL_CATEGORIES_URL = `${this.BASE_URL}\\categories\\all`;
  private DELETE_CATEGORY_URL = `${this.BASE_URL}\\editor\\deleteCategory\\`;
  private ADD_CATEGORY_URL = `${this.BASE_URL}\\editor\\addCategory`;
  private FIND_COUNT_URL = `${this.BASE_URL}\\categoriesCount`;

  constructor(private http: HttpClient) {

  }

  getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(this.ALL_CATEGORIES_URL);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.DELETE_CATEGORY_URL + id);
  }

  findCount(): Observable<number>{
    return this.http.get<number>(this.FIND_COUNT_URL);
  }

  addCategory(info: AddCategoryInfo): Observable<string> {
    return this.http.post<string>(this.ADD_CATEGORY_URL, info);
  }
}
