import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-content',
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.scss']
})
export class CarouselContentComponent implements OnInit {

  @Input() contentType!: string;
  @Input() content!: any;

  constructor() { }

  ngOnInit(): void {
  }
}
