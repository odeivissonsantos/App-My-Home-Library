import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginFilter } from '../interfaces/login/login-filter.interface';
import { LoginRetorno } from '../interfaces/login/login-retorno.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headerOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
  };
  
  baseUrl: String = environment.api_webAPI;

  constructor(private http: HttpClient) { }

  logar(loginFilter: LoginFilter): Observable<LoginRetorno> {
    const url = `${this.baseUrl}/Login/Logar`;
    return this.http.post<LoginRetorno>(url, JSON.stringify(loginFilter), this.headerOptions);
  }
}
