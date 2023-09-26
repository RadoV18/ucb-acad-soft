import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KardexBrief, SemesterResume} from "../../models/SemesterResume";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  baseUrl = 'http://localhost:8080/api/v1/kardex';
  constructor(private http : HttpClient) { }


  public getMyKardex(): Observable<ResponseDto<SemesterResume>> {
    return this.http.get<ResponseDto<SemesterResume>>(`${this.baseUrl}/my-kardex`)
  }



}
