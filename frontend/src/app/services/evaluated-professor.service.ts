import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EvaluatedProfessorDTO } from '../dto/evaluated-professor.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluatedProfessorService {
  baseUrl = `${environment.BACKEND_URL}/api`;
  constructor(private http: HttpClient) { }

  public GetProfessorsEvaluations(): Observable<EvaluatedProfessorDTO[]> {
    return this.http.get<EvaluatedProfessorDTO[]>(`${this.baseUrl}/professorsevaluations`);
  }
}
