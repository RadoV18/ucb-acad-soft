import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SemesterDto} from "../dto/semester.dto";
import {ResponseDto} from "../dto/response.dto";
import { SubjectDto } from '../dto/subject.dto';
<<<<<<< HEAD
<<<<<<< HEAD
import { SubjectDetailDto } from '../dto/subject-detail.dto';
import {StudentInfoDto} from "../dto/student-info.dto";
import {FileDto} from "../dto/file.dto";
=======
>>>>>>> fd027f7 (TDS-15 added card for searching subjects by professor and semester)
=======
import { SubjectDetailDto } from '../dto/subject-detail.dto';
>>>>>>> 920818a (TDS-15 added card for the subject detail info)

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
<<<<<<< HEAD
  baseUrl = 'http://localhost:5260/api/v1/reports';
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
=======
  baseUrl = 'http://localhost:8080/api/v1/reports';
  constructor(private http: HttpClient) { }

  public getSemestersByProfessorId(professorId: number): Observable<ResponseDto<SemesterDto[]>> {
    return this.http.get<ResponseDto<SemesterDto[]>>(`${this.baseUrl}/professors/${professorId}/semester`);
  }

  public getSubjectsByProfessorIdAndSemesterId(professorId: number, semesterId: number): Observable<ResponseDto<SubjectDto[]>> {
    return this.http.get<ResponseDto<SubjectDto[]>>(`${this.baseUrl}/professors/${professorId}/subjects?semesterId=${semesterId}`);
  }
  
<<<<<<< HEAD
>>>>>>> fd027f7 (TDS-15 added card for searching subjects by professor and semester)
=======
  public getSubjectDetailsBySubjectId(subjectId: number): Observable<ResponseDto<SubjectDetailDto>> {
    return this.http.get<ResponseDto<SubjectDetailDto>>(`${this.baseUrl}/subjects/${subjectId}`);
  }
>>>>>>> 920818a (TDS-15 added card for the subject detail info)
}
