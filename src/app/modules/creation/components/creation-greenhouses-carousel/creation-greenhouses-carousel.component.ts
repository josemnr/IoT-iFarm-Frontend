import { 
  Input,
  OnInit, 
  Component, 
  ViewEncapsulation
} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creation-greenhouses-carousel',
  templateUrl: './creation-greenhouses-carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creation-greenhouses-carousel.component.scss']
})
export class CreationGreenhousesCarouselComponent implements OnInit {

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
