import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-response.model'

import { AuthService } from './../auth/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GreenhouseService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getGreenhouse(greenhouse_id: string){
    return this.httpClient.get<ApiResponse>(`${environment.greenhousesUrl}/greenhouses/${greenhouse_id}`, {
      headers: this.httpHeaders
    });
  }

  createGreenhouse(greenhouse: any): Promise<any>{
    return this.httpClient.post(`${environment.greenhousesUrl}/greenhouses`, greenhouse, {
      headers: this.httpHeaders
    }).toPromise();
  }

  deleteGreenhouse(greenhouse_id: string): Promise<any> {
    return this.httpClient.delete(`${environment.greenhousesUrl}/greenhouses/${greenhouse_id}`, {
      headers: this.httpHeaders
    }).toPromise();
  }
}
