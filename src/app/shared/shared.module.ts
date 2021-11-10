import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';

import { LayoutComponent } from './components/layout/layout.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { GreenhouseCardComponent } from './components/greenhouse-card/greenhouse-card.component';
import { EditProfileDialogComponent } from './components/edit-profile-dialog/edit-profile-dialog.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    LineChartComponent,
    GreenhouseCardComponent,
    EditProfileDialogComponent,
  ],
  imports: [
    NgbModule,
    RouterModule,
    ChartsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    ChartsModule,
    MaterialModule,
    HeaderComponent,
    LayoutComponent,
    LineChartComponent,
    ReactiveFormsModule,
    GreenhouseCardComponent,
    EditProfileDialogComponent
  ]
})
export class SharedModule { }
