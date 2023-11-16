import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {ResponseDto} from "../../../dto/response.dto";
import {HttpClient} from "@angular/common/http";
import {CarrerDto, DashboardDto} from "../../../dto/carrer.dto";
import {DashboardRepository} from "../../../repositories/dashboardRepository";
import {SemesterDto} from "../../../dto/semester.dto";

@Injectable({
  providedIn: 'root'
})
export class StudentIndexService {

  constructor(private http: HttpClient, private dashboardRepository : DashboardRepository) { }
  carrers: CarrerDto[]  = [

  ];
  public getCarrers(): Observable<ResponseDto<CarrerDto[]>> {
    return this.http.get<ResponseDto<CarrerDto[]>>('http://localhost:8080/api/v1/dashboards/qualified-students').pipe(
      tap((response: ResponseDto<CarrerDto[]>) => {
        if (response.data && response.data.length > 0) {
          const firstCarrer = response.data[0];
          this.dashboardRepository.setCarrers(response.data);
          this.dashboardRepository.setCarrerDto(response.data);

          if (firstCarrer.subjects && firstCarrer.subjects.length > 0) {
            const firstSubject = firstCarrer.subjects[0];
            console.log("firstSubject", firstSubject)
            this.dashboardRepository.setSubjects(firstCarrer.subjects);

             if (firstSubject.parallels && firstSubject.parallels.length > 0) {
               this.dashboardRepository.setParallels(firstSubject.parallels);
             }

             this.dashboardRepository.setSelectedCarrerId(firstCarrer.id);
             this.dashboardRepository.setSelectedSubjectId(
               firstCarrer.id,
               firstSubject.id
             );
          }
        }
      })
    );
  }

  public gerSemeters() {
    return this.http.get<ResponseDto<SemesterDto[]>>('http://localhost:8080/api/v1/semester');
  }

  sendFilter(carrerId: number, subjectId: number, parallelId: number, semesterId: number): Observable<DashboardDto[]> {
    return this.http.get<DashboardDto[]>(`http://localhost:8080/api/v1/dashboards/qualified/1/100/200`);
  }

}
