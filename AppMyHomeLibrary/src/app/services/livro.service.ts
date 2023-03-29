import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RetornoApiGoogle } from '../interfaces/retorno-api-google/retorno-api-google.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.api_google_books;

  parametro: string = '';
  constructor(private http: HttpClient) { }

  buscarLivro(titulo: string): Observable<RetornoApiGoogle> {
    this.parametro = titulo.replace(/ /g, '+');
    const url = `${this.baseUrl}/volumes?q=${titulo}`
    return this.http.get<RetornoApiGoogle>(url);
  }
}
