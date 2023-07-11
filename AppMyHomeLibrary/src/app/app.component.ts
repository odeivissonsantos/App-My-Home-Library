import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRetornoDTO } from './interfaces/login/login-retorno.interface';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/views/inicio', icon: 'home' },
    { title: 'Pesquisar', url: '/views/pesquisar', icon: 'search' },
    { title: 'Meus Livros', url: '/meus-livros', icon: 'book' }
  ];

  usuario: LoginRetornoDTO = {
    ideUsuario: '',
    nomeUsuario: '',
    sobrenomeUsuario: '',
    email: '',
    token: '',
    isOk: false,
    mensagemRetorno: ''
  };
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '';
  }

  btnSair() {
    this.menuCtrl.enable(false);
    localStorage.removeItem('meus_livros');
    localStorage.removeItem('user');
    this.router.navigate(['views/login']);
  }
}
