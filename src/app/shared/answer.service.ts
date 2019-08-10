import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Answer} from "./model/answer";
import {AddAnswerInfo} from "../add-answer/add-answer-info";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private BASE_URL ="http://localhost:8080";
  private FIND_ALL_BY_QUESTION = `${this.BASE_URL}\\answers\\byquestion\\`;
  private ADD_ANSWER_URL = `${this.BASE_URL}\\addanswer`;
  private DELETE_ANSWER_URL = `${this.BASE_URL}\\editor\\deleteanswer\\`;
  private CHANGE_BEST_URL = `${this.BASE_URL}\\best`;
  private FIND_COUNT_URL = `${this.BASE_URL}\\answersCount`;

  constructor(private http: HttpClient) {
  }

  findCount(): Observable<number>{
    return this.http.get<number>(this.FIND_COUNT_URL);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(this.DELETE_ANSWER_URL + id);
  }
  findAllByQuestion(questionId: number): Observable<Answer[]>{
    return this.http.get<Answer[]>(this.FIND_ALL_BY_QUESTION + questionId);
  }

  addAnswer(info: AddAnswerInfo): Observable<string> {
    return this.http.post<string>(this.ADD_ANSWER_URL, info);
  }

  changeBest(answer: Answer): Observable<string> {
    return this.http.post<string>(this.CHANGE_BEST_URL, answer);
  }

}


