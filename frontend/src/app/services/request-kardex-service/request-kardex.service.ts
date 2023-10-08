import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {RequestKardex} from "../../models/RequestKardex";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestKardexService {

  baseUrl = `${environment.BACKEND_URL}/api/v1/request/kardex`;

  constructor(private http: HttpClient) { }

  public getMyKardexRequests() : Observable<ResponseDto<RequestKardex[]>> {
    return this.http.get<ResponseDto<RequestKardex[]>>(`${this.baseUrl}`);
  }
}
