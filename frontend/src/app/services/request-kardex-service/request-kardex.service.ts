import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {RequestKardex} from "../../models/RequestKardex";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RequestKardexService {

  baseUrl = `${environment.BACKEND_URL}/api/kardex-requests/vouchers`;
  private formGroup : FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formGroup = this.fb.group({
      reason: [''],
    });
  }
  get form(): FormGroup {
    return this.formGroup;
  }

  public getMyKardexRequests(page: number, size: number, order: string, orderBy: string) : Observable<ResponseDto<RequestKardex[]>> {
    return this.http.get<ResponseDto<RequestKardex[]>>(`${this.baseUrl}?page=${page}&size=${size}&order=${order}&orderBy=${orderBy}`);
  }

  newKardexRequest(reason: string, file: File | null)  {
    const formData = new FormData();
    formData.append('reasson', reason);
    // @ts-ignore
    formData.append('file', file);

    console.log(formData.get('reasson'));
    console.log(formData.get('file'));

    return this.http.post(`${this.baseUrl}`, formData);
  }
}
