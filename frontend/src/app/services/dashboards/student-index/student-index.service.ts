import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {ResponseDto} from "../../../dto/response.dto";
import {HttpClient} from "@angular/common/http";
import {DashboardCareerDto, DashboardDto} from "../../../dto/carrer.dto";
import {DashboardRepository} from "../../../repositories/dashboardRepository";
import {SemesterDto} from "../../../dto/semester.dto";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentIndexService {
  baseUrl = `${environment.BACKEND_URL}/api/v1/reports/scores`;


  constructor(private http: HttpClient, private dashboardRepository : DashboardRepository) { }
  semesters: DashboardCareerDto[]  = [

  ];
  public getCarrers(): Observable<ResponseDto<DashboardCareerDto[]>> {
    return this.http.get<ResponseDto<DashboardCareerDto[]>>(`${this.baseUrl}/filters`).pipe(
      tap((response: ResponseDto<DashboardCareerDto[]>) => {
        if (response.data && response.data.length > 0) {
          const firstSemester = response.data[0];
          this.dashboardRepository.setSemesterDto(response.data);
          this.dashboardRepository.setSemesters(response.data);
          console.log(response.data)
          if (firstSemester.careers && firstSemester.careers.length > 0) {
            const firstCarrer = firstSemester.careers[0];
            console.log("firstCarrer", firstCarrer)
            this.dashboardRepository.setCarrers(firstSemester.careers);
            if (firstCarrer.subjects && firstCarrer.subjects.length > 0) {
              const firstSubject = firstCarrer.subjects[0];
              console.log("firstSubject", firstSubject)
              this.dashboardRepository.setSubjects(firstCarrer.subjects);
               if (firstSubject.parallels && firstSubject.parallels.length > 0) {
                 this.dashboardRepository.setParallels(firstSubject.parallels);
               }
               this.dashboardRepository.setSelectedCarrerId(firstCarrer.id);
               this.dashboardRepository.setSelectedSubjectId(
                 firstSubject.id
               );
            }
          }
        }
      })
    );
  }



  sendFilter(carrerId: number, subjectId: number, parallelId: number, semesterId: number): Observable<DashboardDto> {
    console.log("sendFilter", semesterId, carrerId, subjectId, parallelId)
    return this.http.get<DashboardDto>(`${this.baseUrl}/count?semesterId=${semesterId}&careerId=${carrerId}&subjectId=${subjectId}&parallelId=${parallelId}`);
  }

}
