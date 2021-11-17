import { 
  OnInit, 
  Output, 
  Component,
  EventEmitter, 
  ViewChild 
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { User } from 'src/app/core/models/user.model';
import { Greenhouse } from 'src/app/core/models/greenhouse.model';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { GreenhouseService } from 'src/app/core/services/greenhouse/greenhouse.service';

@Component({
  selector: 'app-greenhouse-selector',
  templateUrl: './greenhouse-selector.component.html',
  styleUrls: ['./greenhouse-selector.component.scss']
})
export class GreenhouseSelectorComponent implements OnInit {

  user!: User;
  selected!: Greenhouse;
  newEvent!: MatSelectChange;
  greenhouses!: Greenhouse[];
  @ViewChild('selector') selector!: any;
  @Output() selectedChanged: EventEmitter<Greenhouse> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService
  ) { }

  ngOnInit(): void {
    this.usersService.getUser(this.authService.getUserId()).subscribe(apiResponse => {
      this.user = apiResponse.data;
      if (this.user.greenhouses_id) {
        this.user.greenhouses_id.forEach(greenhouseId => {
          this.greenhouseService.getGreenhouse(greenhouseId).subscribe(greenhouse => {
            if (this.greenhouses) {
              this.greenhouses.push(greenhouse.data);
            }
            else {
              this.selected = greenhouse.data;
              this.greenhouses = [greenhouse.data];
              this.newEvent = new MatSelectChange(this.selector, this.selected);
              this.select(this.newEvent);
            }
          });
        });
      }
    });
  }

  select(select:any): void {
    this.selected = select.value;
    if (select.value != undefined) {
      this.selectedChanged.emit(select);
    }
  }

}
