import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Seed } from 'src/app/core/models/seed.model';
import { User } from './../../../../core/models/user.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model';

import { AuthService } from './../../../../core/services/auth/auth.service';
import { UsersService } from './../../../../core/services/users/users.service';
import { GreenhouseService } from '../../../../core/services/greenhouse/greenhouse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user!: User;
  seeds: Seed[] = [];
  greenhouses: Greenhouse[] = [];
  greenhousesSublist: Array<Greenhouse[]> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService
  ) {
    this.usersService.getUser(this.authService.getUserId())
    .subscribe(apiResponse  => {
      this.user = apiResponse.data;
      if(this.user.greenhouses_id){
        this.loadGreenhouses(this.user.greenhouses_id);
      }
    });
  }

  ngOnInit(): void {
  }

  goToCreate(event: Event) {
    event.preventDefault();
    this.router.navigate(['/creation']);
  }

  loadGreenhouses(greenhouses_id: string[]) {
    let newGreenhouses:Greenhouse[] = [];
    greenhouses_id.forEach(greenhouse_id => {
      this.greenhouseService.getGreenhouse(greenhouse_id)
      .subscribe(apiResponse => {
        newGreenhouses.push(apiResponse.data);
        if(newGreenhouses.length == greenhouses_id.length){
          this.greenhouses = newGreenhouses;
          console.log(newGreenhouses);
          this.makeGreenhousesSet(this.greenhouses);
        }
      });
    });
  }

  makeGreenhousesSet(greenhouses:Greenhouse[]){
    let counter = 0;
    let set: Greenhouse[] = [];
    this.greenhousesSublist = [];
    if(greenhouses.length > 3 ){
      greenhouses.forEach(greenhouse => {
        set.push(greenhouse);
        counter++;
        if(set.length == 3){
          this.greenhousesSublist.push(set);
          set = [];
        }
        else if(greenhouses.length == counter){
          this.greenhousesSublist.push(set);
        }
      });
    }else {
      this.greenhousesSublist.push(greenhouses);
    }
  }

}
