import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/user.model';

import { MyValidators } from './../../../utils/validators';

import { AuthService } from '../../../core/services/auth/auth.service';
import { UsersService } from '../../../core/services/users/users.service';
import { LoggedUserService } from '../../../core/services/loggedUser/logged-user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  user!: User;
  editProfileForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private loggedUserService: LoggedUserService
  ) {
    this.usersService.getUser(this.authService.getUserId())
    .subscribe(apiResponse => {
      this.user = apiResponse.data;
      this.buildForm();
    });
  }

  ngOnInit(): void {
  }

  updateProfile(event: Event) {
    event.preventDefault();
    let dataToUpdate:any
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
      this.usersService.updateUser(this.user._id, dataToUpdate)
      .then(response => {
        this.loggedUserService.loadLoggedUser(this.authService.getUserId());
      });
    }
  }

  private buildForm() {
    this.editProfileForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(30)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.maxLength(30)]],
    }, { validator: MyValidators.emptyForm('name', 'email', 'password') });
    console.log("if: ", this.user);
    if(this.user) {
      this.editProfileForm.controls['name'].setValue(this.user.name);
      this.editProfileForm.controls['email'].setValue(this.user.email);
    }
  }

  getErrorMessage(formControl: string){
    if(this.editProfileForm.controls[formControl].hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  hideOrUnhidePassword(event: Event, inputToHide:string) {
    event.preventDefault();
    if(inputToHide == 'hidePassword') {
      this.hidePassword = !this.hidePassword;
    }
  }

}
