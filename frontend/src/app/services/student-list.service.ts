import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SemesterDto} from "../dto/semester.dto";
import {ResponseDto} from "../dto/response.dto";
import { SubjectDto } from '../dto/subject.dto';
import { SubjectDetailDto } from '../dto/subject-detail.dto';
import {StudentInfoDto} from "../dto/student-info.dto";
import {FileDto} from "../dto/file.dto";

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

  public getSubjectDetailsBySubjectId(subjectId: number, semesterId: number): Observable<ResponseDto<SubjectDetailDto>> {
    return this.http.get<ResponseDto<SubjectDetailDto>>(`${this.baseUrl}/subjects/${subjectId}?semesterId=${semesterId}`);
  }

  public getStudentListBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<StudentInfoDto[]>> {
    return this.http.get<ResponseDto<StudentInfoDto[]>>(`${this.baseUrl}/subjects/${subjectId}/students?semesterId=${semesterId}`);
  }

  public getStudentListCSVBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<FileDto>> {
    return this.http.get<ResponseDto<FileDto>>(`${this.baseUrl}/subjects/${subjectId}/students/csv?semesterId=${semesterId}`);
  }
}
