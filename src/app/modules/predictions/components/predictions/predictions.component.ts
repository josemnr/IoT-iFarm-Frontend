import { Component, OnInit } from '@angular/core';

import { Seed } from 'src/app/core/models/seed.model';
import { Feedback } from 'src/app/core/models/feedback.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { Greenhouse } from './../../../../core/models/greenhouse.model';

import { SeedService } from './../../../../core/services/seed/seed.service';
import { CalendarService } from 'src/app/core/services/calendar/calendar.service';
import { FeedbackService } from './../../../../core/services/feedback/feedback.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {

  ready = false;

  data: any = {};
  maxValues: any = {};
  minValues: any = {};
  seed!: Seed;
  feedbacks!:Feedback[];
  limitsReady:  boolean = false;

  labels = new Array();

  selected!: Greenhouse;

  daysData: any = {
    'Temperature': [],
    'Light': [],
    'Humidity': []
  };

  paramsTitles = Object.keys(this.daysData);

  constructor(
    private seedService: SeedService,
    private feedbackService: FeedbackService,
    private calendarService: CalendarService
  ) {

  }

  ngOnInit(): void {
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

  loadFeedbacks(seed_id:string) {
    this.feedbackService.getFeedbacksBySeed(seed_id)
    .subscribe(apiResponse => {
      this.feedbacks = apiResponse.data;
    });
  }

  private resetData() {
    this.labels = [];
    this.daysData["Light"] = [];
    this.daysData["Humidity"] = [];
    this.daysData["Temperature"] = [];
  }

  private CargaDatos() {
    this.ready = false;
    console.log('Cargar Datos');
    let fechaHoy = new Date();
    for (let dias = 3; dias >= 0; dias--) {
      this.generaDataVacio(fechaHoy, dias);
    }
    let contadorFechas = 0;
    for (let fecha in this.data) {
      this.labels.push(fecha);
      this.calendarService.getDatesByDateAndGreenhouse(this.selected._id, fecha).subscribe(data => {
        if (data.data[0]) {
          this.ejecutarDia(data, fecha);
          console.log('Datos cargados: ', data.data[0], fecha);
        }
        else {          
          this.agregaCeros("Light", fecha);
          this.agregaCeros("Humidity", fecha);
          this.agregaCeros("Temperature", fecha);
        }
      }, err => { }, () => {
        contadorFechas++;
        if (contadorFechas == Object.keys(this.data).length) {
          for (let fecha in this.data) {
            console.log('Inflar tabla: ', this.data[fecha]);
            this.daysData["Light"].push(this.data[fecha]["Light"].toFixed(2));
            this.daysData["Humidity"].push(this.data[fecha]["Humidity"].toFixed(2));
            this.daysData["Temperature"].push(this.data[fecha]["Temperature"].toFixed(2));
          }          
          this.ready = true;
        }
      }
      );
    }
  }

  private generaDataVacio(fechaHoy: Date, dias: number) {
    let nuevaFecha = new Date();
    nuevaFecha.setDate(fechaHoy.getDate() - dias);
    let fechaFormato = nuevaFecha.getFullYear() + '-' + (nuevaFecha.getMonth() + 1) + '-' + nuevaFecha.getDate();
    this.data[fechaFormato] = [
      {
        "Light": 0,
        "Humidity": 0,
        "Temperature": 0
      }
    ];
  }

  private ejecutarDia(data: ApiResponse, fecha: string) {
    let Light = [];
    let Humidity = [];
    let Temperature = [];

    for (let hora in data.data[0].dailyData) {
      Humidity.push(data.data[0].dailyData[hora].humidity);
      Temperature.push(data.data[0].dailyData[hora].temperature);
      Light.push(data.data[0].dailyData[hora].light);
    }
  
    this.agregaPromedio(Light, "Light", fecha);
    this.agregaPromedio(Humidity, "Humidity", fecha);
    this.agregaPromedio(Temperature, "Temperature", fecha);
  }

  private agregaCeros(target: string, fecha: string) {
    this.data[fecha][target] = 0;
  }

  private agregaPromedio(arreglo: any[], target: string, fecha: string) {
    let summaT = 0;
    arreglo.forEach(element => {
      summaT += element;
    });
    this.data[fecha][target] = summaT/8;
  }

  cambioSelect(event:any): void {
    console.log('Cambio select', event.value);
    this.selected = event.value;
    this.loadSeed(this.selected.seed_id);
    this.loadFeedbacks(this.selected.seed_id);
    this.resetData();
    this.CargaDatos();
  }

}
