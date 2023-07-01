import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistrarFilter } from 'src/app/interfaces/usuario/registrar-filter.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(
    private router: Router,
    private serviceUsuario: UsuarioService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  registrarFilter: RegistrarFilter = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  }

  registrar() {
    if (this.registrarFilter.email === '' || this.registrarFilter.nome === '' || this.registrarFilter.confirmacaoSenha === '' 
                                  || this.registrarFilter.sobrenome === '' || this.registrarFilter.senha === '' ) {   
      this.presentAlert('Todos os campos são obrigatórios!');
    }
    else
    {    
      this.serviceUsuario.cadastrarNovoUsuario(this.registrarFilter).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.presentAlert(resposta.mensagemRetorno);
          this.router.navigate(['views/login']);
        }
        else
        {
          this.presentAlert(resposta.mensagemRetorno);
        }
      },
      (errorResponse) => {
        if (errorResponse.error.isOk === false) {   
          this.presentAlert(errorResponse.error.mensagemRetorno);
        }
      });
    }
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  async presentAlert(resposta: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: resposta,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
