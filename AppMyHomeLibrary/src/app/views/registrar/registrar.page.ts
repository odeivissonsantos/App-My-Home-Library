import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarFilter } from 'src/app/interfaces/usuario/registrar-filter.interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  registrarFilter: RegistrarFilter = {
    cpf: '',
    email: '',
    nome: '',
    senha: '',
    sobrenome: ''
  }

  registrar() {

  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }


}
