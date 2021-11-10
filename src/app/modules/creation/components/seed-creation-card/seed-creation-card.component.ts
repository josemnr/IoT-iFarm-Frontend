import { 
  Input, 
  OnInit, 
  Component 
} from '@angular/core';
import { Seed } from './../../../../core/models/seed.model';

@Component({
  selector: 'app-seed-creation-card',
  templateUrl: './seed-creation-card.component.html',
  styleUrls: ['./seed-creation-card.component.scss']
})
export class SeedCreationCardComponent implements OnInit {

  @Input() seed!: Seed;

  constructor() { }

  ngOnInit(): void {
  }

}
