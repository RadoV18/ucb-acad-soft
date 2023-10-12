import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";

@Injectable({
  providedIn: 'root'
})
export class ContinuosEvaluationService {

  baseUrl = `${environment.BACKEND_URL}/api/reports/continuous-evaluation`;


  constructor(private http : HttpClient) { }

  public getContinuosEvaluation(): Observable<ResponseDto<string>> {
    return this.http.get<ResponseDto<string>>(`${this.baseUrl}/pdf`)
  }
}
