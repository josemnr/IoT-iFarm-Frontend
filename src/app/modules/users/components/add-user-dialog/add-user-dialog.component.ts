import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/user.model';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { GreenhouseService } from 'src/app/core/services/greenhouse/greenhouse.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  
  loggedUser!: User;
  editProfileForm!: FormGroup;
  user: any = {
    email: "",
    name: "",
    password: "",
    role: "employee",
    supervisor_id: "",
    greenhouses_id: []
  };
  ghUserData!: {
    name: string,
    id: string,
    checked: boolean,
  }[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ghServ: GreenhouseService,
    private usersService: UsersService,
    private sessionServ:SessionService
  ) {
    this.buildForm();
    this.usersService.getUser(this.authService.getUserId()).subscribe(
      apiResponse => {
        this.loggedUser = apiResponse.data;
        this.loggedUser.greenhouses_id.forEach(ghID => {
          this.ghServ.getGreenhouse(ghID).subscribe(
            greeenhouse => {
              if (this.ghUserData && this.ghUserData.length != 0) {

                this.ghUserData.push({ name: greeenhouse.data.name, id: greeenhouse.data._id, checked: false });

              }
              else {
                this.ghUserData = [{ name: greeenhouse.data.name, id: greeenhouse.data._id, checked: false }];
              }
            },
          );
        });
      },
    );
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.editProfileForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }


  updateProfile() {
    this.user.email = this.editProfileForm.value.email;
    this.user.name = this.editProfileForm.value.name;
    this.user.password = this.editProfileForm.value.password;
    this.user.supervisor_id = this.loggedUser._id;
    this.ghUserData.forEach(dato => {
      if (dato.checked) {
        this.user.greenhouses_id.push(dato.id);
      }
    });
    console.log("agregar aqui usuario nuevo", this.user);
    this.sessionServ.signup(this.user);
  }

  setChanged(event:any, i:any): void {
    this.ghUserData[i].checked = event.checked;
  }

}
