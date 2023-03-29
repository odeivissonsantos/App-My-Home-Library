import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginFilter } from 'src/app/interfaces/login/login-filter.interface';
import { RetornoItems } from 'src/app/interfaces/login/retorno-items.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private serviceLogin: LoginService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  loginFilter: LoginFilter = {
    email: '',
    senha: ''
  };

  logar(): void {
    if (this.loginFilter.email === '' || this.loginFilter.senha === '' ) {   
      this.presentAlert('Email/Senha é obrigatório, revise os dados e tente novamente!');
    }
    else
    {    
      this.serviceLogin.logar(this.loginFilter).subscribe((resposta) => {
        console.log(resposta);
        if(resposta.isOk === true) {
          localStorage.setItem('user', JSON.stringify(resposta.items[0]));
          this.router.navigate(['views/inicio']);
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

  btnSair() {
    localStorage.removeItem('user');
    this.router.navigate(['views/login']);
  }

  async presentAlert(resposta: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: resposta,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getUser(): RetornoItems {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }


}
