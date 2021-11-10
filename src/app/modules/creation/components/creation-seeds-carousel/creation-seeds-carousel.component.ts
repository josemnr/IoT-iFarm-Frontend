import { 
  Input, 
  OnInit, 
  Component, 
  ViewEncapsulation 
} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creation-seeds-carousel',
  templateUrl: './creation-seeds-carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creation-seeds-carousel.component.scss']
})
export class CreationSeedsCarouselComponent implements OnInit {

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
