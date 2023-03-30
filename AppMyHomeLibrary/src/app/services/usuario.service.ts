import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistrarFilter } from '../interfaces/usuario/registrar-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  headerOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
  };

  baseUrl: String = environment.api_webAPI;
  
  constructor(
    private http: HttpClient
  ) { }


  salvar(registrarFilter: RegistrarFilter): Observable<LoginRetorno> {
    const url = `${this.baseUrl}/Usuario/Salvar`;
    return this.http.post<LoginRetorno>(url, JSON.stringify(registrarFilter), this.headerOptions);
  }
}
