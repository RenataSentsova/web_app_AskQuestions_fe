import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./model/user";
import {catchError, map} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";
import {AddSubcategoryInfo} from "../add-subcategory/add-subcategory-info";
import {Subcategory} from "./model/subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private BASE_URL ="http://localhost:8080";
  private ALL_SUBCATEGORIES_URL = `${this.BASE_URL}\\subcategories\\all`;
  private SUBCATEGORIES_BY_CATEGORY_URL = `${this.BASE_URL}\\subcategories\\bycategory\\`;
  private DELETE_SUBCATEGORY_URL = `${this.BASE_URL}\\editor\\deletesubcategory\\`;
  private GET_NAME_SUBCATEGORY_BY_ID_URL = `${this.BASE_URL}\\subcategories\\`;
  private ADD_SUBCATEGORY_URL = `${this.BASE_URL}\\editor\\addsubcategory`;
  private FIND_COUNT_URL = `${this.BASE_URL}\\subcategoriesCount`;

  constructor(private http: HttpClient) { }

  getAllSubcategories() : Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(this.ALL_SUBCATEGORIES_URL);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(this.DELETE_SUBCATEGORY_URL + id);
  }

  getSubcategoriesByCategory(categoryId: number): Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(this.SUBCATEGORIES_BY_CATEGORY_URL + categoryId);
  }

  findCount(): Observable<number>{
    return this.http.get<number>(this.FIND_COUNT_URL);
  }

  addSubcategory(info: AddSubcategoryInfo): Observable<string> {
    return this.http.post<string>(this.ADD_SUBCATEGORY_URL, info);
  }

  getNameSubcatById(subcatId: number){
    return this.http.get(this.GET_NAME_SUBCATEGORY_BY_ID_URL + subcatId,  {responseType: 'text'});
  }
}
