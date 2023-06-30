import { Component, OnInit } from '@angular/core';
import { LoginRetornoDTO } from 'src/app/interfaces/login/login-retorno.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( ) { }

  dadosUsuario: LoginRetornoDTO = {
    ideUsuario: '',
    nomeUsuario: '',
    sobrenomeUsuario: '',
    email: '',
    token: '',
    isOk: false,
    mensagemRetorno: ''
  }

  ngOnInit() {
    this.dadosUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }
}
