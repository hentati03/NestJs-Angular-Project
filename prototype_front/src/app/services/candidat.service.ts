import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signUp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidats/signup`, data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidats/signin`, data);
  }
}
