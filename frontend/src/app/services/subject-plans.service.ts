import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubjectPlan } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectPlansService {
  baseUrl = `${environment.BACKEND_URL}/api`;
  constructor(private http: HttpClient) { }

  public GetAllPlans(): Observable<SubjectPlan[]> {
    return this.http.get<SubjectPlan[]>(`${this.baseUrl}/SubjectPlans`);
  }

  public UpdatePlan(plan: SubjectPlan): Observable<SubjectPlan> {
    return this.http.put<SubjectPlan>(`${this.baseUrl}/SubjectPlans/${plan.id}`, plan);
  }

  public getPdfReport(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/SubjectPlans/pdf/${id}`);
  }
}
