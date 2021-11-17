import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { PredictionsRoutingModule } from './predictions-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling'

import { PredictionsComponent } from './components/predictions/predictions.component';
import { GreenhouseSelectorComponent } from './components/greenhouse-selector/greenhouse-selector.component';


@NgModule({
  declarations: [
    PredictionsComponent,
    GreenhouseSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScrollingModule,
    PredictionsRoutingModule
  ]
})
export class PredictionsModule { }
