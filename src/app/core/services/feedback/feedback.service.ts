import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-response.model'

import { AuthService } from './../auth/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  getFeedback(feedback_id: string){
    return this.httpClient.get<ApiResponse>(`${environment.feedbackUrl}/feedback/${feedback_id}`, {
      headers: this.httpHeaders
    });
  }

  getFeedbacksBySeed(seed_id: string) {
    return this.httpClient.get<ApiResponse>(`${environment.feedbackUrl}/feedback/?seed_id=${seed_id}`, {
      headers: this.httpHeaders
    });
  }

  createFeedback(feedback: any): Promise<any>{
    return this.httpClient.post(`${environment.feedbackUrl}/feedback`, feedback, {
      headers: this.httpHeaders
    }).toPromise();
  }

  deleteFeedback(feedback_id: string): Promise<any> {
    return this.httpClient.delete(`${environment.feedbackUrl}/feedback/${feedback_id}`, {
      headers: this.httpHeaders
    }).toPromise();
  }
}
