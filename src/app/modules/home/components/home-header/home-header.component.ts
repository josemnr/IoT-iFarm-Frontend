import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../../../core/models/user.model';

import { EditProfileDialogComponent } from './../../../../shared/components/edit-profile-dialog/edit-profile-dialog.component';

import { AuthService } from './../../../../core/services/auth/auth.service';
import { LoggedUserService } from '../../../../core/services/loggedUser/logged-user.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  @Output() userGreenhouses: EventEmitter<any> = new EventEmitter();

  user!: User;
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private loggedUserService: LoggedUserService,
  ) {
    this.loggedUserService.loggedUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  editProfile(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(EditProfileDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
