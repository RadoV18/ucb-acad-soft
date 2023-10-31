import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";

@Injectable({
  providedIn: 'root'
})
export class SecondTermEvaluationService {
  baseUrl = `${environment.BACKEND_URL}/api/reports/second-term-evaluation`;


  constructor(private http : HttpClient) { }

  public getSecondTermEvaluation(): Observable<ResponseDto<string>> {
    return this.http.get<ResponseDto<string>>(`${this.baseUrl}/pdf`)
  }
}
