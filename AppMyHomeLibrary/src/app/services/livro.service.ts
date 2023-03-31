import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RetornoApiGoogle } from '../interfaces/retorno-api-google/retorno-api-google.interface';
import { RetornoListarLivros } from '../interfaces/livro/retorno-listar-livros.interface';
import { LivroFilter } from '../interfaces/livro/livro-filter.interface';
import { RetornoSalvar } from '../interfaces/livro/retorno-cadastrar.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  headerOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
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

  listarLivros(guidUsuario: string): Observable<RetornoListarLivros>{
    const url = `${this.baseUrl_api_webAPI}/Livro/BuscarLivrosPorUsuario?guidUsuario=${guidUsuario}`
    return this.http.get<RetornoListarLivros>(url);
  }

  salvar(livroFilter: LivroFilter): Observable<RetornoSalvar> {
    const url = `${this.baseUrl_api_webAPI}/Livro/Salvar`;
    return this.http.post<RetornoSalvar>(url, JSON.stringify(livroFilter), this.headerOptions);
  }
}
