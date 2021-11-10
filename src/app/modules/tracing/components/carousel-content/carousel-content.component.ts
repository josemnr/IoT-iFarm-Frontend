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
import { DailyData } from './../../../../core/models/dailyData.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model'

import { SeedService } from './../../../../core/services/seed/seed.service';
import { CalendarService } from './../../../../core/services/calendar/calendar.service';
import { LoggedUserService } from '../../../../core/services/loggedUser/logged-user.service';

import { DeleteGreenhouseDialogComponent } from './../delete-greenhouse-dialog/delete-greenhouse-dialog.component';

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
  
  maxValues: any = {};
  minValues: any = {};

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
      this.maxValues['Light'] = this.seed.max_red_light;
      this.minValues['Light'] = this.seed.min_red_light;
      this.maxValues['Humidity'] = this.seed.max_humidity;
      this.minValues['Humidity'] = this.seed.min_humidity;
      this.maxValues['Temperature'] = this.seed.max_temperature;
      this.minValues['Temperature'] = this.seed.min_temperature;
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
}
