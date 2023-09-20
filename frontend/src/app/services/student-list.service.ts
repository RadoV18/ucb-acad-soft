import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SemesterDto} from "../dto/semester.dto";
import {ResponseDto} from "../dto/response.dto";
import { SubjectDto } from '../dto/subject.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  baseUrl = 'http://localhost:8080/api/v1/reports';
  constructor(private http: HttpClient) { }

  public getSemestersByProfessorId(professorId: number): Observable<ResponseDto<SemesterDto[]>> {
    return this.http.get<ResponseDto<SemesterDto[]>>(`${this.baseUrl}/professors/${professorId}/semester`);
  }

  public getSubjectsByProfessorIdAndSemesterId(professorId: number, semesterId: number): Observable<ResponseDto<SubjectDto[]>> {
    return this.http.get<ResponseDto<SubjectDto[]>>(`${this.baseUrl}/professors/${professorId}/subjects?semesterId=${semesterId}`);
  }
  
}
