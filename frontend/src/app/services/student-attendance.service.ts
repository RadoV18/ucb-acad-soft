import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {AttendanceDto} from "../dto/attendance.dto";
import {StudentAttendanceResumeDto} from "../dto/student-attendance-resume.dto";
import {FileDto} from "../dto/file.dto";

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {
  baseUrl = `${environment.BACKEND_URL}/api/v1/reports`;
  constructor(private http: HttpClient) { }

  public getAttendanceListBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<AttendanceDto[]>> {
    return this.http.get<ResponseDto<AttendanceDto[]>>(`${this.baseUrl}/students/subjects/${subjectId}/attendances?semesterId=${semesterId}`);
  }

  public getAttendanceResumeBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<StudentAttendanceResumeDto[]>> {
    return this.http.get<ResponseDto<StudentAttendanceResumeDto[]>>(`${this.baseUrl}/students/subjects/${subjectId}/attendances/resumes?semesterId=${semesterId}`);
  }

  public getStudentAttendanceResumeCSVBySubjectIdAndSemesterId(subjectId: number, semesterId: number): Observable<ResponseDto<FileDto>> {
    return this.http.get<ResponseDto<FileDto>>(`${this.baseUrl}/students/csv/subjects/${subjectId}/attendances/resumes?semesterId=${semesterId}`);
  }
}
