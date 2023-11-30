import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudentAverageDTO } from '../dto/student-average.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAverageService {
  baseUrl = `${environment.BACKEND_URL}/api`;
  constructor(private http: HttpClient) { }

  public GetStudentsAveragesList(): Observable<StudentAverageDTO[]> {
    return this.http.get<StudentAverageDTO[]>(`${this.baseUrl}/studentaverages`);
  }

  public getPdfReport(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/studentaverages/pdf`);
  }

}
