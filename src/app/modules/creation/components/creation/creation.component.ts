import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Seed } from '../../../../core/models/seed.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model';

import { SeedCreationDialogComponent } from './../seed-creation-dialog/seed-creation-dialog.component';
import { GreenhouseCreationDialogComponent } from './../greenhouse-creation-dialog/greenhouse-creation-dialog.component';

import { AuthService } from './../../../../core/services/auth/auth.service';
import { SeedService } from './../../../../core/services/seed/seed.service';
import { UsersService } from './../../../../core/services/users/users.service';
import { GreenhouseService } from '../../../../core/services/greenhouse/greenhouse.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  seeds: Seed[] = [];
  greenhouses: Greenhouse[] = [];
  seedsSublist: Array<Seed[]> = [];
  greenhousesSublist: Array<Greenhouse[]> = [];

  constructor(
    public dialog: MatDialog,
    private seedService: SeedService,
    private authService: AuthService,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService,
  ) {
    this.usersService.getUser(this.authService.getUserId()).subscribe(apiResponse => {
      if(apiResponse.data.greenhouses_id){
        this.loadGreenhouses(apiResponse.data.greenhouses_id);
      }
    });
    this.seedService.getAllSeeds().subscribe(apiResponse => {
      this.seeds = [...this.seeds, apiResponse.data];
      this.makeSeedsSet(apiResponse.data);
    });
  }

  ngOnInit(): void {
  }

  loadGreenhouses(greenhouses_id: string[]) {
    let nuevos:Greenhouse[] = [];
    greenhouses_id.forEach(greenhouse_id => {
      this.greenhouseService.getGreenhouse(greenhouse_id)
      .subscribe(apiResponse => {
        nuevos.push(apiResponse.data);
        if(nuevos.length == greenhouses_id.length){
          this.greenhouses = nuevos;
          this.makeGreenhousesSet(this.greenhouses);
        }
      });
    });
  }

  makeGreenhousesSet(greenhouses:Greenhouse[]){
    let counter = 0;
    let set:any = [];
    this.greenhousesSublist = [];
    if(greenhouses.length > 3){
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

  makeSeedsSet(seeds:Seed[]){
    let counter = 0;
    let set:any = [];
    this.seedsSublist = [];
    if(seeds.length > 3){
      seeds.forEach(greenhouse => {
        set.push(greenhouse);
        counter++;
        if(set.length == 3){
          this.seedsSublist.push(set);
          set = [];
        }
        else if(seeds.length == counter){
          this.seedsSublist.push(set);
        }
      });
    }else {
      this.seedsSublist.push(seeds);
    }
  }

  createGreenhouse(event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(GreenhouseCreationDialogComponent, {
      data: this.seeds[0],
    });
    dialogRef.afterClosed().subscribe(result => {
      this.usersService.getUser(this.authService.getUserId())
      .subscribe(apiResponse => {
        if(apiResponse.data.greenhouses_id){
          this.loadGreenhouses(apiResponse.data.greenhouses_id);
        }
      });
      this.seedService.getAllSeeds().subscribe(apiResponse => {
        this.seeds = [...this.seeds, apiResponse.data];
        this.makeSeedsSet(apiResponse.data);
      });
    });
  }

  createSeed(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(SeedCreationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.usersService.getUser(this.authService.getUserId())
      .subscribe(apiResponse => {
        if(apiResponse.data.greenhouses_id){
          this.loadGreenhouses(apiResponse.data.greenhouses_id);
        }
      });
      this.seedService.getAllSeeds().subscribe(apiResponse => {
        this.seeds = [...this.seeds, apiResponse.data];
        this.makeSeedsSet(apiResponse.data);
      });
    });
  }
}
