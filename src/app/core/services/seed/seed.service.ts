import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-response.model'

import { AuthService } from './../auth/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getAllSeeds() {
    return this.httpClient.get<ApiResponse>(`${environment.seedsUrl}/seeds`, {
      headers: this.httpHeaders
    });
  }

  getSeed(seed_id: string){
    return this.httpClient.get<ApiResponse>(`${environment.seedsUrl}/seeds/${seed_id}`, {
      headers: this.httpHeaders
    });
  }

  CreateSeed(seed){
    return this.httpClient.post<ApiResponse>(`${environment.seedsUrl}/seeds/`, seed, {
      headers: this.httpHeaders
    });
  }

  // getSeed(id: string){
  //   return this.httpClient.get<Seed>(`/api/seeds/${id}`);
  // }
}
