import { 
  FormGroup, 
  Validators,
  FormBuilder 
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { User } from 'src/app/core/models/user.model';
import { Greenhouse } from 'src/app/core/models/greenhouse.model';

import { MyValidators } from './../../../../utils/validators';

import { UsersService } from './../../../../core/services/users/users.service';
import { GreenhouseService } from './../../../../core/services/greenhouse/greenhouse.service';
import { LoggedUserService } from './../../../../core/services/loggedUser/logged-user.service';

@Component({
  selector: 'app-delete-greenhouse-dialog',
  templateUrl: './delete-greenhouse-dialog.component.html',
  styleUrls: ['./delete-greenhouse-dialog.component.scss']
})
export class DeleteGreenhouseDialogComponent implements OnInit {

  greenhouse!: Greenhouse;
  userGreenhouses!: string[];
  deleteGreenhouseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService,
    private loggedUserService: LoggedUserService,
    public dialogRef: MatDialogRef<DeleteGreenhouseDialogComponent>
  ) {
    this.buildForm();
    this.loggedUserService.loggedUser.subscribe(user => {
      if(user.greenhouses_id) {
        this.userGreenhouses = user.greenhouses_id;
      }
    });
  }

  ngOnInit(): void {
  }

  deleteGreenhouse(event: Event) {
    event.preventDefault();
    if (this.deleteGreenhouseForm.valid) {
      let contador = 1;
      this.greenhouseService.deleteGreenhouse(this.greenhouse._id);
      this.usersService.getUsersByGreenhouse(this.greenhouse._id)
      .subscribe(apiResponse => {
        apiResponse.data.forEach((user: User) => {
          let greenhousesIdsUpdate = {
            "greenhouses_id": user.greenhouses_id.filter(
              (greenhouse_id: string) => 
              greenhouse_id !== this.greenhouse._id
            )
          }
          console.log("Update gh: ",greenhousesIdsUpdate);
          this.usersService.updateUser(user._id, greenhousesIdsUpdate)
          .then(response => {
            console.log("procesando ",contador,apiResponse.data.length);
            if(apiResponse.data.length == contador) {
              console.log("saliendo");
              this.dialogRef.close(true);
            }
            contador += 1;
          });
        });
      });
    }
  }

  private buildForm() {
    this.deleteGreenhouseForm = this.formBuilder.group({
      confirmation: ['', [Validators.required]],
    }, { validator: MyValidators.placeholderMatch('confirmation', 'Delete') });
  }

}
