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
}
