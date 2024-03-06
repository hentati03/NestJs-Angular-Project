import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/Demande';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  constructor(private http: HttpClient) {}

  getAllDemandes() {
    return this.http.get<Demande[]>('http://localhost:3000/demandes');
  }
}
