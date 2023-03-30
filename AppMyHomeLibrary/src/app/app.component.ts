import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RetornoItems } from './interfaces/login/retorno-items.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/views/inicio', icon: 'home' },
    { title: 'Pesquisar', url: '/views/pesquisar', icon: 'search' }
  ];

  usuario: RetornoItems = {
    nomeUsuario: '',
    email: ''
  };
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
   this.usuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }

  btnSair() {
    localStorage.removeItem('user');
    this.router.navigate(['views/login']);
  }
}
