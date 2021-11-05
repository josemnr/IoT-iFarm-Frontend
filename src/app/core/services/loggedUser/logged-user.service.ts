import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { User } from '../../models/user.model';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private user!: User;
  loggedUser = new BehaviorSubject<any>({});

  loggedUser$ = this.loggedUser.asObservable();

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.loadLoggedUser(this.authService.getUserId());
  }

  loadLoggedUser(user_id: string) {
    this.usersService.getUser(user_id)
    .subscribe(apiResponse => {
      this.user = apiResponse.data
      this.loggedUser.next(this.user);
    })
  }
}
