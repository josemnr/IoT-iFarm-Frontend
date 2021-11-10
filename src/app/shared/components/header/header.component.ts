import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './../../../core/services/auth/auth.service';
import { LoggedUserService } from './../../../core/services/loggedUser/logged-user.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile_pic!: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private loggedUserService: LoggedUserService
  ) {
    this.loggedUserService.loggedUser.subscribe(user => {
      this.profile_pic = user.profile_pic;
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
