import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {AcademicPerformanceDto} from "../../dto/academic-performance.dto";

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  baseUrl = `${environment.BACKEND_URL}/api/reports/dashboards`;


  constructor(private http : HttpClient) { }

  public getAcademicPerformance(
    subjectIds: number[],
    semesterId: number
  ): Observable<ResponseDto<AcademicPerformanceDto>> {
    const subjectIdsString = subjectIds.map((subjectId) => {
      return `subjectIds=${subjectId}`
    }).join("&");
    return this.http.get<ResponseDto<AcademicPerformanceDto>>(`${this.baseUrl}/academic-performance?${subjectIdsString}&semesterId=${semesterId}`)
  }
}
