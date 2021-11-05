import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-response.model'

import { AuthService } from './../auth/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private today = new Date();
  private date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getAllDates() {
    return this.httpClient.get<ApiResponse>(`${environment.calendarUrl}/calendar`, {
      headers: this.httpHeaders
    });
  }

  getDatesByDay(date: string) {
    return this.httpClient.get<ApiResponse>(`${environment.calendarUrl}/calendar?date=${date}`, {
      headers: this.httpHeaders
    });
  }

  getDatesForTodayAndGreenhouse(greenhouse_id: string){
    return this.httpClient.get<ApiResponse>(`${environment.calendarUrl}/calendar?date=${this.date}&greenhouse_id=${greenhouse_id}`, {
      headers: this.httpHeaders
    })
  }

  getDatesByDateAndGreenhouse(greenhouse_id: string,date:string){
    return this.httpClient.get<ApiResponse>(`${environment.calendarUrl}/calendar?date=${date}&greenhouse_id=${greenhouse_id}`, {
      headers: this.httpHeaders
    })
  }

  getDate(date_id: string) {
    return this.httpClient.get<ApiResponse>(`${environment.calendarUrl}/calendar/${date_id}`, {
      headers: this.httpHeaders
    });
  }
}
