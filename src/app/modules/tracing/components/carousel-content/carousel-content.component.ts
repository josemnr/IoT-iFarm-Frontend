import { 
  Input, 
  OnInit, 
  Output, 
  Component, 
  OnChanges, 
  EventEmitter ,
  SimpleChanges, 
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Seed } from 'src/app/core/models/seed.model';
import { User } from './../../../../core/models/user.model';
// import { DailyData } from './../../../../core/models/dailyData.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model'

import { SeedService } from './../../../../core/services/seed/seed.service';
import { CalendarService } from './../../../../core/services/calendar/calendar.service';
import { LoggedUserService } from '../../../../core/services/loggedUser/logged-user.service';
import { AuthService } from './../../../../core/services/auth/auth.service';
import { UsersService } from './../../../../core/services/users/users.service';
import { GreenhouseService } from '../../../../core/services/greenhouse/greenhouse.service';

import { DeleteGreenhouseDialogComponent } from './../delete-greenhouse-dialog/delete-greenhouse-dialog.component';
import {  SendFeedbackDialogComponent } from './../send-feedback-dialog/send-feedback-dialog.component'

@Component({
  selector: 'app-carousel-content',
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.scss']
})
export class CarouselContentComponent implements OnInit, OnChanges {

  @Input() content!: Greenhouse;
  @Output() greenhouseDeleted: EventEmitter<any> = new EventEmitter();

  user!: User;
  seed!: Seed;
  dataReady: boolean = false;
  limitsReady:  boolean = false;
  
  maxValues: any = {};
  minValues: any = {};

  seeds: Seed[] = [];
  greenhouses: Greenhouse[] = [];
  seedsSublist: Array<Seed[]> = [];
  greenhousesSublist: Array<Greenhouse[]> = [];

  dayData: any = {
    'Temperature': [],
    'Light': [],
    'Humidity': []
  };

  xLabelTest!: string[];
  greenhouseDailyData: any;
  paramsTitles = Object.keys(this.dayData);

  constructor(
    public dialog: MatDialog,
    private seedService: SeedService,
    private calendarService: CalendarService,
    private loggedUserService: LoggedUserService,
    private authService: AuthService,
    private usersService: UsersService,
    private greenhouseService: GreenhouseService
  ) {
    this.loggedUserService.loggedUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.content) {
      this.loadSeed(this.content.seed_id);
      this.calendarService.getDatesForTodayAndGreenhouse(this.content._id)
      .subscribe(apiResponse => {
        this.greenhouseDailyData = apiResponse.data[0].dailyData;
        this.getDayData(this.greenhouseDailyData);
      });
    }
  }

  loadSeed(seed_id: string) {
    this.seedService.getSeed(seed_id)
    .subscribe(apiResponse => {
      this.seed = apiResponse.data;
      this.maxValues['Light'] = this.seed.max_light;
      this.minValues['Light'] = this.seed.min_light;
      this.maxValues['Humidity'] = this.seed.max_humidity;
      this.minValues['Humidity'] = this.seed.min_humidity;
      this.maxValues['Temperature'] = this.seed.max_temperature;
      this.minValues['Temperature'] = this.seed.min_temperature;
      this.limitsReady = true;
    });
  }

  getDayData(greenhouseDailyData: any) {
    this.xLabelTest = Object.keys(greenhouseDailyData);
    console.log('xLabels: ', this.xLabelTest);
    this.xLabelTest.forEach(hour => {
      this.dayData['Light'].push(greenhouseDailyData[hour]['light']);
      this.dayData['Humidity'].push(greenhouseDailyData[hour]['humidity']);      
      this.dayData['Temperature'].push(greenhouseDailyData[hour]['temperature']);
    });
    this.dataReady = true;
    console.log(this.dayData);
  }

  deleteGreenhouse() {
    const dialogRef = this.dialog.open(DeleteGreenhouseDialogComponent);
    dialogRef.componentInstance.greenhouse = this.content;
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.greenhouseDeleted.emit(true);
      }
    });
  }
  
  sendFeedback(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(SendFeedbackDialogComponent);
    dialogRef.componentInstance.greenhouse = this.content;
    dialogRef.componentInstance.user_name = this.user.name;
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
