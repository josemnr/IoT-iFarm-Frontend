import { 
  Input, 
  Output, 
  OnInit, 
  Component, 
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tracing-carousel',
  templateUrl: './tracing-carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tracing-carousel.component.scss']
})
export class TracingCarouselComponent implements OnInit {

  @Input() allContent!: Array<any>;
  @Output() ghDeleted: EventEmitter<any> = new EventEmitter();

  constructor(
    private _config: NgbCarouselConfig
  ) {
    this._config.interval = 6000;
    this._config.pauseOnHover = true;
    this._config.pauseOnFocus = true;
    this._config.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }

  greenhouseDeleted(event: Event) {
    console.log("Padre recibe deleted");
    this.ghDeleted.emit(true);
  }

}
