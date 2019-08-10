import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL ="http://localhost:8080";
  private ALL_USERS_URL =`${this.BASE_URL}\\users`;
  private USER_BY_ID_URL = `${this.BASE_URL}\\users\\`;
  private GET_USER_ID_BY_USER_NAME_URL = `${this.BASE_URL}\\user\\`;
  private DELETE_USER_URL = `${this.BASE_URL}\\editor\\deleteuser`;

  constructor(private http: HttpClient) { }

  deleteUser(login: string): Observable<any> {
    return this.http.post(this.DELETE_USER_URL, login);
  }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.ALL_USERS_URL);
  }

  getUserById(userId: number) : Observable<User>{
    return this.http.get<User> (this.USER_BY_ID_URL + userId);
  }

  getUserIdByUserName(username: string): Observable<number>{
    return this.http.get<number>(this.GET_USER_ID_BY_USER_NAME_URL + username);
  }
}
