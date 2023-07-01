import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
          localStorage.setItem('token', JSON.stringify(resposta.token));
          this.listarMeusLivros(resposta.ideUsuario, resposta.token);
          this.router.navigate(['views/inicio']);

        }
        else
        {
          this.presentAlert(resposta.mensagemRetorno);
        }
      },
      (errorResponse) => {
        if (errorResponse.isOk === false) {   
          this.presentAlert(errorResponse.error);
        }
      });
    }
  }

  listarMeusLivros(ide_usuario: string, token: string) { 
    this.livroService.listarPorUsuario(ide_usuario, token).subscribe((resposta) => {
      if(resposta.isOk === true) {
        alert('cheguei aqui');
        if (resposta.items.length > 0)
        {
          localStorage.setItem('meus_livros', JSON.stringify(resposta.items[0]));
        }
        else 
        {
          alert('cheguei aqui 2');
          localStorage.setItem('meus_livros', JSON.stringify({"ide_Livro": 0, "autor": "", "ano": 0,
            "editora": "", "codigo_Barras": 0, "url_Capa": "", "titulo": "","observacao": ""
          }));
        }
      }
    },
    (errorResponse) => {
    });
}


  btnSair() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('meus_livros');
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

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }


}
