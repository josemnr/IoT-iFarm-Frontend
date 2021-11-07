import {
  Input,
  OnInit,
  OnChanges,
  Component,
  SimpleChanges
} from '@angular/core';

import { Greenhouse } from './../../../../core/models/greenhouse.model';

@Component({
  selector: 'app-carousel-content',
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.scss']
})
export class CarouselContentComponent implements OnInit, OnChanges {

  @Input() content!: Greenhouse[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
  }

}
