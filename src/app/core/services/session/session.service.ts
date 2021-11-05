import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  signin(email:string, password:string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${email}:${password}`),
    });
    return this.httpClient.post(`${environment.authUrl}/auth/sign-in`, {}, {
      headers: httpHeaders
    }).toPromise();
  }

  signup(data: any):Promise<any> {
    return this.httpClient.post(`${environment.authUrl}/auth/sign-up`, data).toPromise();
  }
}

