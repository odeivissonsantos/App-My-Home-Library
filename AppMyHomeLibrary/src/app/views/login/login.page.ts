import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoginFilter } from 'src/app/interfaces/login/login-filter.interface';
import { RetornoItems } from 'src/app/interfaces/login/retorno-items.interface';
import { LivroService } from 'src/app/services/livro.service';
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
    private livroService: LivroService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    localStorage.setItem('user', JSON.stringify({"ideUsuario": "", "nomeUsuario": "", "sobrenomeUsuario": "", "email": "","token": "", "isOk": "", "mensagemRetorno": ""}));
  }

  versionApp: any = '1.0.0.1';

  loginFilter: LoginFilter = {
    email: '',
    senha: '',
    token: ''
  };

  logar(): void {
    if (this.loginFilter.email === '' || this.loginFilter.senha === '' ) {   
      this.presentAlert('Email/Senha é obrigatório, revise os dados e tente novamente!');
    }
    else
    {    
      this.serviceLogin.logar(this.loginFilter).subscribe((resposta) => {
        if(resposta.isOk === true) {
          localStorage.setItem('user', JSON.stringify(resposta));
          this.listarMeusLivros(resposta.ideUsuario, resposta.token);
          this.menuCtrl.enable(true);
          this.router.navigate(['views/inicio']);
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

  listarMeusLivros(ide_usuario: string, token: string) { 
    this.livroService.listarPorUsuario(ide_usuario, token).subscribe((resposta) => {
      if(resposta.isOk === true) {
        if (resposta.items.length > 0)
        {
          localStorage.setItem('meus_livros', JSON.stringify(resposta.items[0]));
        }
        else 
        {
          localStorage.setItem('meus_livros', JSON.stringify({"ide_Livro": 0, "autor": "", "ano": 0,
            "editora": "", "codigo_Barras": 0, "url_Capa": "", "titulo": "","observacao": ""
          }));
        }
      }
    },
    (errorResponse) => {
    });
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

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }


}
