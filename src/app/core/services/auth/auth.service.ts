import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loginStatus.next(this.isLoggedIn());
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loginStatus.next(true);
  }

  saveUserId(user_id: string) {
    localStorage.setItem('user_id', user_id);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token') || false;
  }

  getUserId() {
    return localStorage.getItem('user_id') || '';
  }

  logout() {
    localStorage.clear();
    this.loginStatus.next(false);
  }
}
