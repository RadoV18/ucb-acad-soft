import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Subject, SubjectContinuousGrades } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  baseUrl = `${environment.BACKEND_URL}/api/subjects`;

  constructor(private httpClient : HttpClient) { }

  fetchSubjects() {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}`);
  }

  fetchSubjectContinuousEvaluation(subjectCode : string) {
    return this.httpClient.get<SubjectContinuousGrades>(`http://localhost:5260/api/continuousgrades`)
  }


}
