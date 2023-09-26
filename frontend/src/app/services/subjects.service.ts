import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private httpClient : HttpClient) { }

  fetchSubjects() {
    return this.httpClient.get<Subject[]>('http://localhost:5260/api/subjects')
  }
}
