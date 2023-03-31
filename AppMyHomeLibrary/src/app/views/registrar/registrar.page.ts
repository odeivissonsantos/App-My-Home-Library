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
    cpf: '',
    email: '',
    nome: '',
    senha: '',
    sobrenome: ''
  }

  registrar() {
    if (this.registrarFilter.cpf === '' || this.registrarFilter.email === '' || this.registrarFilter.nome === '' 
                                  || this.registrarFilter.sobrenome === '' || this.registrarFilter.senha === '' ) {   
      this.presentAlert('Todos os campos são obrigatórios!');
    }
    else
    {    
      this.serviceUsuario.salvar(this.registrarFilter).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.presentAlert(resposta.items[0].mensagem);
          this.router.navigate(['views/login']);
        }
        else
        {
          this.presentAlert(resposta.messages[0].message);
        }
      },
      (errorResponse) => {
        if (errorResponse.isOk === false) {   
          this.presentAlert(errorResponse.error);
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
