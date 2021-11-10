import { 
  OnInit, 
  Component, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';

import { User } from './../../../../core/models/user.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model';

import { AuthService } from '../../../../core/services/auth/auth.service';
import { UsersService } from '../../../../core/services/users/users.service';
import { GreenhouseService } from '../../../../core/services/greenhouse/greenhouse.service';
import { LoggedUserService } from '../../../../core/services/loggedUser/logged-user.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss']
})
export class TracingComponent implements OnInit, OnChanges {

  user!: User;
  greenhouses!: Greenhouse[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService,
    private loggedUserService: LoggedUserService
  ) {
    this.usersService.getUser(this.authService.getUserId())
    .subscribe(apiResponse => {
      this.user = apiResponse.data;
      if(this.user.greenhouses_id){
        this.loadGreenhouses(this.user.greenhouses_id);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.user) {
      this.loadGreenhouses(this.user.greenhouses_id);
    }
  }

  loadGreenhouses(greenhouses_id: string[]) {
    this.greenhouses = [];
    greenhouses_id.forEach(greenhouse_id => {
      this.greenhouseService.getGreenhouse(greenhouse_id)
      .subscribe(apiResponse => {
        this.greenhouses.push(apiResponse.data);
      });
    });
  }

  greenhouseDeleted(event:Event) {
    console.log("Abuelo recibe deleted");
    this.usersService.getUser(this.authService.getUserId())
    .subscribe(apiResponse => {
      this.user = apiResponse.data
      if(apiResponse.data.greenhouses_id){
        console.log(apiResponse.data.greenhouses_id);
        this.loadGreenhouses(apiResponse.data.greenhouses_id);
      }
    })
  }

}
