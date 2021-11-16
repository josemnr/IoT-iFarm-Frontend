import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { TracingRoutingModule } from './tracing-routing.module';

import { TracingComponent } from './components/tracing/tracing.component';
import { CarouselContentComponent } from './components/carousel-content/carousel-content.component';
import { TracingCarouselComponent } from './components/tracing-carousel/tracing-carousel.component';
import { DeleteGreenhouseDialogComponent } from './components/delete-greenhouse-dialog/delete-greenhouse-dialog.component';
import { SendFeedbackDialogComponent } from './components/send-feedback-dialog/send-feedback-dialog.component';


@NgModule({
  declarations: [
    CarouselContentComponent,
    DeleteGreenhouseDialogComponent,
    TracingCarouselComponent,
    TracingComponent,
    SendFeedbackDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TracingRoutingModule
  ]
})
export class TracingModule { }
