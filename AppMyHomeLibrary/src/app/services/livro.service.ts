import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RetornoApiGoogle } from '../interfaces/retorno-api-google/retorno-api-google.interface';
import { RetornoListarLivros } from '../interfaces/livro/retorno-listar-livros.interface';
import { LivroFilter } from '../interfaces/livro/livro-filter.interface';
import { CriticaDTO } from '../interfaces/retorno-web-api/critica.interface';
import { RetornoBuscarPorID } from '../interfaces/livro/retorno-bucar-por-id.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.api_google_books;
  baseUrl_api_webAPI: String = environment.api_webAPI;

  parametro: string = '';
  constructor(private http: HttpClient) { }

  buscarLivro(titulo: string): Observable<RetornoApiGoogle> {
    this.parametro = titulo.replace(/ /g, '+');
    const url = `${this.baseUrl}/volumes?q=${titulo}`
    return this.http.get<RetornoApiGoogle>(url);
  }

  listarPorUsuario(ide_usuario: string, token: string): Observable<RetornoListarLivros>{
    const url = `${this.baseUrl_api_webAPI}/Livro/ListarPorUsuario?ide_usuario=${ide_usuario}`
    
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.get<RetornoListarLivros>(url, headerOptions);
  }

  novo(livroFilter: LivroFilter, token: string): Observable<CriticaDTO> {
    const url = `${this.baseUrl_api_webAPI}/Livro/Novo`;
    
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.post<CriticaDTO>(url, JSON.stringify(livroFilter), headerOptions);
  }

  editar(livroFilter: LivroFilter, token: string): Observable<CriticaDTO> {
    const url = `${this.baseUrl_api_webAPI}/Livro/Editar`;

    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.put<CriticaDTO>(url, JSON.stringify(livroFilter), headerOptions);
  }

  buscarPorID(ide_livro: string, token: string): Observable<RetornoBuscarPorID>{
    const url = `${this.baseUrl_api_webAPI}/Livro/BuscarPorID?ide_livro=${ide_livro}`;
    
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.get<RetornoBuscarPorID>(url, headerOptions);
  }

  excluir(ide_livro: string, token: string): Observable<CriticaDTO>{
    const url = `${this.baseUrl_api_webAPI}/Livro/Excluir?ide_livro=${ide_livro}`;   
    
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.delete<CriticaDTO>(url, headerOptions);
  }
}
