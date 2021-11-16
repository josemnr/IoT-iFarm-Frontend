import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from 'src/app/core/models/user.model';
import { Greenhouse } from 'src/app/core/models/greenhouse.model';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { GreenhouseService } from 'src/app/core/services/greenhouse/greenhouse.service';
import { LoggedUserService } from 'src/app/core/services/loggedUser/logged-user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  dataUser: any
  loggedUser!: User;
  userToUpdate!: User;
  greenHouses!: Greenhouse[];
  editProfileForm!: FormGroup;
  hidePassword: boolean = true;
  ghUserData!: {
    name: string,
    id: string,
    checked: boolean,
  }[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private loggedUserService: LoggedUserService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private ghServ: GreenhouseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buildForm();
    this.usersService.getUser(this.authService.getUserId()).subscribe(
      apiResponse => {
        this.loggedUser = apiResponse.data;
        this.loggedUser.greenhouses_id.forEach(ghID => {
          this.ghServ.getGreenhouse(ghID).subscribe(
            greeenhouse => {
              if (this.ghUserData && this.ghUserData.length != 0) {

                this.ghUserData.push({ name: greeenhouse.data.name, id: greeenhouse.data._id, checked: (this.userToUpdate.greenhouses_id.indexOf(ghID) > -1) || false });

              }
              else {
                this.ghUserData = [{ name: greeenhouse.data.name, id: greeenhouse.data._id, checked: (this.userToUpdate.greenhouses_id.indexOf(ghID) > -1) || false }];
              }
            },
          );
        });
      },
    );
  }

  ngOnInit(): void {

  }

  updateProfile(event: Event) {
    event.preventDefault();
    let dataToUpdate:any = {}
    if (this.editProfileForm.valid) {
      if (this.editProfileForm.value.name != "") {

        dataToUpdate["name"] = this.editProfileForm.value.name;
      }
      if (this.editProfileForm.value.email != "") {
        dataToUpdate["email"] = this.editProfileForm.value.email;
      }
      if (this.editProfileForm.value.password != "") {
        dataToUpdate["password"] = this.editProfileForm.value.password;
      }
      let checked: string[] = [];
      this.ghUserData.forEach(dato => {
        if (dato.checked) {
          checked.push(dato.id);
        }
      });
      dataToUpdate["greenhouses_id"] = checked;

      this.usersService.updateUser(this.data._id, dataToUpdate);
      // this.loggedUserService.loadLoggedUser(this.authService.getUserId());
    }
  }

  private buildForm() {
    this.editProfileForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(30)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.maxLength(30)]],
    });
    if (this.data) {
      this.editProfileForm.controls['name'].setValue(this.data.name);
      this.editProfileForm.controls['email'].setValue(this.data.email);
      this.userToUpdate = this.data;
    }
  }

  getErrorMessage(formControl: string) {
    if (this.editProfileForm.controls[formControl].hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  hideOrUnhidePassword(event: Event, inputToHide: string) {
    event.preventDefault();
    if (inputToHide == 'hidePassword') {
      this.hidePassword = !this.hidePassword;
    }
  }

  setChanged(event:any, i:any): void {
    this.ghUserData[i].checked = event.checked;
  }

}
