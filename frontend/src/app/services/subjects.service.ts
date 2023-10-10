import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../interfaces/interfaces';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  baseUrl = `${environment.BACKEND_URL}/api/subjects`;

  constructor(private httpClient : HttpClient) { }

  fetchSubjects() {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}`);
  }
}
