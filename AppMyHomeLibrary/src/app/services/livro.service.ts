import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RetornoApiGoogle } from '../interfaces/retorno-api-google/retorno-api-google.interface';
import { RetornoListarLivros } from '../interfaces/livro/retorno-listar-livros.interface';
import { LivroFilter } from '../interfaces/livro/livro-filter.interface';
import { RetornoSalvar } from '../interfaces/livro/retorno-cadastrar.interface';
import { RetornoBuscarPorGuid } from '../interfaces/livro/retorno-bucar-por-guid.interface';
import { CriticaDTO } from '../interfaces/retorno-web-api/critica.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  headerOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        'token': JSON.parse(localStorage.getItem('token')!)
    })
  };
  
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
    
    const headerOptions2 = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'token': token
      })
    }

    return this.http.get<RetornoListarLivros>(url, headerOptions2);
  }

  novo(livroFilter: LivroFilter): Observable<RetornoSalvar> {
    const url = `${this.baseUrl_api_webAPI}/Livro/Novo`;
    return this.http.post<RetornoSalvar>(url, JSON.stringify(livroFilter), this.headerOptions);
  }

  editar(livroFilter: LivroFilter): Observable<RetornoSalvar> {
    const url = `${this.baseUrl_api_webAPI}/Livro/Editar`;
    return this.http.post<RetornoSalvar>(url, JSON.stringify(livroFilter), this.headerOptions);
  }

  buscarPorID(ide_livro: string): Observable<RetornoBuscarPorGuid>{
    const url = `${this.baseUrl_api_webAPI}/Livro/BuscarPorID?ide_livro=${ide_livro}`
    return this.http.get<RetornoBuscarPorGuid>(url, this.headerOptions);
  }

  excluir(ide_livro: string): Observable<CriticaDTO>{
    const url = `${this.baseUrl_api_webAPI}/Livro/Excluir?ide_livro=${ide_livro}`
    return this.http.delete<CriticaDTO>(url, this.headerOptions);
  }
}
