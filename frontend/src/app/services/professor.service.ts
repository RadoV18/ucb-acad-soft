import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  baseUrl = `${environment.BACKEND_URL}/api/v1/reports`;

  constructor(private http: HttpClient) { }
  public getProfessorSchedulePDF(): Observable<ResponseDto<string>> {
    return this.http.get<ResponseDto<string>>(`${this.baseUrl}/professors/schedule`);
  }
}
