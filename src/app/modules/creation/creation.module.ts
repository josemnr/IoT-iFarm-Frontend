import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { CreationRoutingModule } from './creation-routing.module';

import { CreationComponent } from './components/creation/creation.component';
import { CarouselContentComponent } from './components/carousel-content/carousel-content.component';
import { SeedCreationCardComponent } from './components/seed-creation-card/seed-creation-card.component';
import { SeedCreationDialogComponent } from './components/seed-creation-dialog/seed-creation-dialog.component';
import { CreationSeedsCarouselComponent } from './components/creation-seeds-carousel/creation-seeds-carousel.component';
import { GreenhouseCreationCardComponent } from './components/greenhouse-creation-card/greenhouse-creation-card.component';
import { GreenhouseCreationDialogComponent } from './components/greenhouse-creation-dialog/greenhouse-creation-dialog.component';
import { CreationGreenhousesCarouselComponent } from './components/creation-greenhouses-carousel/creation-greenhouses-carousel.component';


@NgModule({
  declarations: [
    CreationComponent,
    CarouselContentComponent,
    SeedCreationCardComponent,
    SeedCreationDialogComponent,
    CreationSeedsCarouselComponent,
    GreenhouseCreationCardComponent,
    GreenhouseCreationDialogComponent,
    CreationGreenhousesCarouselComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreationRoutingModule
  ]
})
export class CreationModule { }
