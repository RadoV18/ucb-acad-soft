import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../../dto/response.dto";
import {SemesterResume} from "../../models/SemesterResume";
import {RequestKardex} from "../../models/RequestKardex";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RequestKardexService {

  private formGroup : FormGroup;



  baseUrl = 'http://localhost:5260/api/kardex-requests/vouchers';


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formGroup = this.fb.group({
      reason: [''],
    });
  }
  get form(): FormGroup {
    return this.formGroup;
  }

  public getMyKardexRequests() : Observable<ResponseDto<RequestKardex[]>> {
    return this.http.get<ResponseDto<RequestKardex[]>>(`${this.baseUrl}`);
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
