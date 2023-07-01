import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrarFilter } from '../interfaces/usuario/registrar-filter.interface';
import { RegistrarRetorno } from '../interfaces/usuario/registrar-retorno.interface';
import { CriticaDTO } from '../interfaces/retorno-web-api/critica.interface';

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


  cadastrarNovoUsuario(registrarFilter: RegistrarFilter): Observable<CriticaDTO> {
    const url = `${this.baseUrl}/Login/CadastrarNovoUsuario`;
    return this.http.post<CriticaDTO>(url, JSON.stringify(registrarFilter), this.headerOptions);
  }
}
