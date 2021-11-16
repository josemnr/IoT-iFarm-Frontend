import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './components/users/users.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';


@NgModule({
  declarations: [
    AddUserDialogComponent,
    EditUserDialogComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
