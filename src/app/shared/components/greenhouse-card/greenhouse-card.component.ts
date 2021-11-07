import {
  Input,
  OnInit,
  Component,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Seed } from '../../../core/models/seed.model';
import { Greenhouse } from '../../../core/models/greenhouse.model';

import { SeedService } from './../../../core/services/seed/seed.service';

@Component({
  selector: 'app-greenhouse-card',
  templateUrl: './greenhouse-card.component.html',
  styleUrls: ['./greenhouse-card.component.scss']
})
export class GreenhouseCardComponent implements OnInit, OnChanges {

  @Input() greenhouse!: Greenhouse;

  seed!: Seed;

  constructor(private seedService: SeedService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.greenhouse) {
      this.loadSeed(this.greenhouse.seed_id);
    }
  }

  loadSeed(seed_id: string) {
    this.seedService.getSeed(seed_id)
    .subscribe(apiResponse => {
      this.seed = apiResponse.data;
    });
  }

}
