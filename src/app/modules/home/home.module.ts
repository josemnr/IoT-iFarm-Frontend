import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './components/home/home.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CarouselContentComponent } from './components/carousel-content/carousel-content.component';

import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeCarouselComponent,
    CarouselContentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
