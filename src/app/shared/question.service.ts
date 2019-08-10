import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "./model/question";
import {AskInfo} from "../ask/ask-info";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private BASE_URL ="http://localhost:8080";
  private QUESTIONS_BY_SUBCATEGORY_URL = `${this.BASE_URL}\\questions\\bysubcategory\\`;
  private FIND_ONE_URL = `${this.BASE_URL}\\question\\`;
  private ADD_QUESTUON_URL = `${this.BASE_URL}\\ask`;
  private DELETE_QUESTION_URL = `${this.BASE_URL}\\editor\\deletequestion\\`;
  private FIND_BY_USER_ID_URL = `${this.BASE_URL}\\questionsbyuser\\`;
  private FIND_COUNT_URL = `${this.BASE_URL}\\questionsCount`;
  private IS_HAS_BEST_ANSWER_URL = `${this.BASE_URL}\\isHasBestAnswer\\`;
  private TAKE_BEST_ANSWER_ID_URL = `${this.BASE_URL}\\takeBestAnswerId\\`;

  constructor(private http: HttpClient) {

  }


  getQuestionsBySubcategory(subcategoryId: number): Observable<Question[]>{
    return this.http.get<Question[]> (this.QUESTIONS_BY_SUBCATEGORY_URL + subcategoryId);
  }

  takeBestAnswerId(questionId: number): Observable<number>{
    return this.http.get<number>(this.TAKE_BEST_ANSWER_ID_URL + questionId);
  }

  isHasBestAnswer(id: number): Observable<boolean>{
    return this.http.get<boolean>(this.IS_HAS_BEST_ANSWER_URL + id);
  }

  findCount(): Observable<number>{
    return this.http.get<number>(this.FIND_COUNT_URL);
  }

  getQuestionsByUserId(userId: number): Observable<Question[]>{
    return this.http.get<Question[]> (this.FIND_BY_USER_ID_URL + userId);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(this.DELETE_QUESTION_URL + id);
  }

  findOne(id: number): Observable<Question>{
    return this.http.get<Question>(this.FIND_ONE_URL + id);
  }

  ask(info: AskInfo): Observable<string> {
    return this.http.post<string>(this.ADD_QUESTUON_URL, info);
  }
}
