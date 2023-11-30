import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbandonRatesDTO } from '../dto/abandon-rates.dto';

@Injectable({
  providedIn: 'root'
})
export class AbandonRatesService {
  baseUrl = `${environment.BACKEND_URL}/api`;
  constructor(private http: HttpClient) { }

  public GetAbandonRates(): Observable<AbandonRatesDTO> {
    return this.http.get<AbandonRatesDTO>(`${this.baseUrl}/AbandonRates`);
  }
}
