import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResponseDto} from "../../../dto/response.dto";
import {HttpClient} from "@angular/common/http";
import {CarrerDto} from "../../../dto/carrer.dto";

@Injectable({
  providedIn: 'root'
})
export class StudentIndexService {

  constructor(private http: HttpClient) { }

  public getCarrers(): Observable<ResponseDto<CarrerDto[]>> {
    return this.http.get<ResponseDto<CarrerDto[]>>(`http://localhost:8080/api/v1/dashboards/qualified-students`)
  }
}
