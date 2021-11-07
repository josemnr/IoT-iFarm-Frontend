import { 
  Input,
  OnInit, 
  Component, 
  ViewEncapsulation 
} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  @Input() allContent!: Array<any>;

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

}
