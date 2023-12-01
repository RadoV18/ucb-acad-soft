import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SemesterDto} from "../dto/semester.dto";
import {ResponseDto} from "../dto/response.dto";
import { SubjectDto } from '../dto/subject.dto';
import { SubjectDetailDto } from '../dto/subject-detail.dto';
import {StudentInfoDto} from "../dto/student-info.dto";
import {FileDto} from "../dto/file.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  baseUrl = `${environment.BACKEND_URL}/api/v1/reports`;
  constructor(private http: HttpClient) { }

  public getSemestersByProfessorId(professorId: number): Observable<ResponseDto<SemesterDto[]>> {
    return this.http.get<ResponseDto<SemesterDto[]>>(`${this.baseUrl}/semesters/professors/${professorId}`);
  }

  public getSubjectsByProfessorIdAndSemesterId(professorId: number, semesterId: number): Observable<ResponseDto<SubjectDto[]>> {
    return this.http.get<ResponseDto<SubjectDto[]>>(`${this.baseUrl}/subjects/professors/${professorId}?semesterId=${semesterId}`);
  }

  public getSubjectDetailsBySubjectId(subjectId: number,  professorId: number,semesterId: number): Observable<ResponseDto<SubjectDetailDto>> {
    return this.http.get<ResponseDto<SubjectDetailDto>>(`${this.baseUrl}/subjects/${subjectId}/professors/${professorId}?semesterId=${semesterId}`);
  }

  public getStudentListBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<StudentInfoDto[]>> {
    return this.http.get<ResponseDto<StudentInfoDto[]>>(`${this.baseUrl}/students/subjects/${subjectId}?semesterId=${semesterId}`);
  }

  public getStudentListCSVBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<FileDto>> {
    return this.http.get<ResponseDto<FileDto>>(`${this.baseUrl}/students/csv/subjects/${subjectId}?semesterId=${semesterId}`);
  }

  public getStudentSchedulePDF(): Observable<ResponseDto<string>> {
    return this.http.get<ResponseDto<string>>(`${this.baseUrl}/students/schedule`);
  }
}
