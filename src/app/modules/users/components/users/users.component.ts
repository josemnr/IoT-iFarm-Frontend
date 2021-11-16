import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/core/models/user.model';

import { UsersService } from 'src/app/core/services/users/users.service';
import { GreenhouseService } from 'src/app/core/services/greenhouse/greenhouse.service';
import { LoggedUserService } from 'src/app/core/services/loggedUser/logged-user.service';

import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usuarios!: User[];
  loggedUser!: User;
  invernaderos!: any[];

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private ghServ: GreenhouseService,
    private loggedUserService: LoggedUserService
  ) { }

  ngOnInit(): void {
    this.loggedUserService.loggedUser.subscribe(user => {
      this.loggedUser = user;
      console.log("usuario", user);
      let supervisor_id = this.loggedUser._id;
      if (this.loggedUser.supervisor_id) {
        supervisor_id = this.loggedUser.supervisor_id;
      }
      this.userService.getEmployeesBySupervisor(supervisor_id).subscribe(res => {
        this.usuarios = res.data;
      });
      this.invernaderos = [];
      if(this.loggedUser.greenhouses_id) {
        this.loggedUser.greenhouses_id.forEach(ghID => {
          this.ghServ.getGreenhouse(ghID).subscribe(greenHouse => {
            this.invernaderos.push(greenHouse.data);
            console.log(greenHouse.data);
          });
        });
      }
    });
  }

  borrarUsuario(index: number): void {
    if (confirm("Delete " + this.usuarios[index].name + "?")) {
      this.userService.deleteUser(this.usuarios[index]._id)
      .then(response => {
        this.userService.getEmployeesBySupervisor(this.loggedUser._id).subscribe(res => {
          this.usuarios = res.data;
        });
      });
    }
  }

  borrarGH(index: number): void {
    if (confirm("Delete " + this.invernaderos[index].name + "?")) {
      console.log("borrando");
    }
  }

  editUser(index:number): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: this.usuarios[index] ,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userService.getEmployeesBySupervisor(this.loggedUser._id).subscribe(res => {
        this.usuarios = res.data;
      });
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userService.getEmployeesBySupervisor(this.loggedUser._id).subscribe(res => {
        this.usuarios = res.data;
      });
    });
  }

}
