import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.sessionStorage.removeItem('AuthToken');
    window.sessionStorage.setItem('AuthToken', token);
  }

  getToken(): string {
    return sessionStorage.getItem('AuthToken');
  }

  saveUsername(username: string) {
    window.sessionStorage.removeItem('AuthUsername');
    window.sessionStorage.setItem('AuthUsername', username);
  }

  getUsername(): string {
    return sessionStorage.getItem('AuthUsername');
  }

  saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem('AuthAuthorities');
    window.sessionStorage.setItem('AuthAuthorities', JSON.stringify(authorities));
  }

  getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem('AuthToken')) {
      JSON.parse(sessionStorage.getItem('AuthAuthorities')).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}
