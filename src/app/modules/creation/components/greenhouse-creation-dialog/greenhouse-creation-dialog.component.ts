import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Seed } from 'src/app/core/models/seed.model';

import { UsersService } from './../../../../core/services/users/users.service';
import { LoggedUserService } from './../../../../core/services/loggedUser/logged-user.service';
import { GreenhouseService } from './../../../../core/services/greenhouse/greenhouse.service';

@Component({
  selector: 'app-greenhouse-creation-dialog',
  templateUrl: './greenhouse-creation-dialog.component.html',
  styleUrls: ['./greenhouse-creation-dialog.component.scss']
})
export class GreenhouseCreationDialogComponent implements OnInit {

  selected: Seed;
  createGreenhouseForm!: FormGroup;
  private today = new Date();
  private date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService,
    private loggedUserService: LoggedUserService,
    public dialogRef: MatDialogRef<GreenhouseCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Seed[],
  ) {
    this.buildForm();
    this.selected = data[0];
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.createGreenhouseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      pH: ['', [Validators.required, Validators.min(0), Validators.max(14)]],
      red_light: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      blue_light: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      humidity: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      temperature: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
    });
  }

  createGreenhouse(event: Event) {
    event.preventDefault();
    console.log(this.createGreenhouseForm.value);
    let greenhouse = this.createGreenhouseForm.value;
    greenhouse.humidity = greenhouse.humidity / 100;
    greenhouse.start_at = this.date;
    greenhouse.seed_id = this.selected._id;
    this.greenhouseService.createGreenhouse(greenhouse)
      .then(response => {
        this.loggedUserService.loggedUser.subscribe(user => {
          let greenhouses_id = user.greenhouses_id
          greenhouses_id.push(response.data)
          let greenhousesIdsUpdate = {
            "greenhouses_id": greenhouses_id
          }
          this.usersService.updateUser(user._id, greenhousesIdsUpdate).then(updatedUser => {
            console.log("actualizado y cerrando dialogo",updatedUser);
            console.log("con esta info ",greenhousesIdsUpdate);
            this.dialogRef.close(true);
          });
        });
      });
  }
}
