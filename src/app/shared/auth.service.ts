import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/auth-login-info';
import { SignUpInfo } from '../auth/signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL ="http://localhost:8080";
  private LOGIN_URL = `${this.BASE_URL}\\api\\auth\\signin`;
  private SIGN_UP_URL = `${this.BASE_URL}\\api\\auth\\signup`;

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.LOGIN_URL, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.SIGN_UP_URL, info, httpOptions);
  }
}
