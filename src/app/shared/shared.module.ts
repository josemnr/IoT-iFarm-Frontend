import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './material/material.module';

import { GreenhouseCardComponent } from './components/greenhouse-card/greenhouse-card.component';
import { EditProfileDialogComponent } from './components/edit-profile-dialog/edit-profile-dialog.component';

@NgModule({
  declarations: [
    GreenhouseCardComponent,
    EditProfileDialogComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    GreenhouseCardComponent,
    EditProfileDialogComponent
  ]
})
export class SharedModule { }
