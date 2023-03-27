import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/views/inicio', icon: 'home' },
    { title: 'Pesquisar', url: '/views/pesquisar', icon: 'search' },
    { title: 'Sair', url: '/views/login', icon: 'log-out' }
  ];

  constructor() {}
}
