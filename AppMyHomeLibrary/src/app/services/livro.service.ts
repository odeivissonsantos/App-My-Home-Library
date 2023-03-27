import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  buscarLivro(titulo: string): Observable<string[]> {
    titulo.replace(/ /g, '+');
    return this.http.get<string[]>(`${environment.api_google_books}${titulo}`);
  }
}
