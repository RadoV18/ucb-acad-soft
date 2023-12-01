import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Subject, SubjectContinuousGrades } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  baseUrl = `${environment.BACKEND_URL}/api`;


  constructor(private httpClient : HttpClient) { }

  fetchSubjects() {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}/subjects`);
  }

  fetchSubjectContinuousEvaluation(subjectCode : string) {
    return this.httpClient.get<SubjectContinuousGrades>(`${this.baseUrl}/continuousgrades`)
  }


}
