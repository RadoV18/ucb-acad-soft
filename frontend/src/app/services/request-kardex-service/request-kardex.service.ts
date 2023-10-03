import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {SemesterResume} from "../../models/SemesterResume";
import {RequestKardex} from "../../models/RequestKardex";

@Injectable({
  providedIn: 'root'
})
export class RequestKardexService {

  baseUrl = 'http://localhost:8080/api/v1/request/kardex';

  constructor(private http: HttpClient) { }

  public getMyKardexRequests() : Observable<ResponseDto<RequestKardex[]>> {
    return this.http.get<ResponseDto<RequestKardex[]>>(`${this.baseUrl}`);
  }
}
