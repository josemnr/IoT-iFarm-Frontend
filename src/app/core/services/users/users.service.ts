import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-response.model'

import { AuthService } from './../auth/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getAllUsers() {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users`, {
      headers: this.httpHeaders
    });
  }

  getUsersByGreenhouse(greenhouse_id: string) {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users?greenhouses_id=${greenhouse_id}`, {
      headers: this.httpHeaders
    });
  }

  getAllEmployees() {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users?role=employee`, {
      headers: this.httpHeaders
    });
  }

  getEmployeesBySupervisor(supervisor_id: any) {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users?supervisor_id=${supervisor_id}`, {
      headers: this.httpHeaders
    });
  }

  getAllSupervisors() {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users?role=supervisor`, {
      headers: this.httpHeaders
    });
  }

  getUser(user_id: string) {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users/${user_id}`, {
      headers: this.httpHeaders
    });
  }


  getUserbyMail(email: string) {
    return this.httpClient.get<ApiResponse>(`${environment.usersUrl}/users/${email}`, {
      headers: this.httpHeaders
    });
  }
  updateUser(user_id: string, data:any): Promise<any> {
    console.log("data: ", data)
    return this.httpClient.put(`${environment.usersUrl}/users/${user_id}`, data, {
      headers: this.httpHeaders
    }).toPromise();
  }


  deleteUser(user_id: string): Promise<any> {
    return this.httpClient.delete(`${environment.usersUrl}/users/${user_id}`, {
      headers: this.httpHeaders
    }).toPromise();
  }

}

