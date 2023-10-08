import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KardexBrief, SemesterResume} from "../../models/SemesterResume";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  baseUrl = `${environment.BACKEND_URL}/api/reports/kardex`;
  constructor(private http : HttpClient) { }


  public getMyKardex(): Observable<ResponseDto<SemesterResume>> {
    console.log("getMyKardex");
    return this.http.get<ResponseDto<SemesterResume>>(`${this.baseUrl}`)
  }



}
