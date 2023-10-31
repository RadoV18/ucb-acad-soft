import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {ResponseDto} from "../../dto/response.dto";
import {RequestKardex} from "../../models/RequestKardex";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  baseUrl = `${environment.BACKEND_URL}/api/admin`;
  constructor(private http: HttpClient) { }

  public adminAcceptRequest(date: string | null, id: number) {
    return this.http.put<ResponseDto<RequestKardex>>(`${this.baseUrl}/${id}/${date}/accept`, {})
  }

  public adminRejectRequest(id: number) {
    return this.http.put<ResponseDto<RequestKardex>>(`${this.baseUrl}/${id}/reject`, {})
  }


}
