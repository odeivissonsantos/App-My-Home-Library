import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RetornoItemsListarLivros } from 'src/app/interfaces/livro/retorno-items-listar-livros.interface';
import { LoginRetornoDTO } from 'src/app/interfaces/login/login-retorno.interface';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-meus-livros',
  templateUrl: './meus-livros.page.html',
  styleUrls: ['./meus-livros.page.scss'],
})
export class MeusLivrosPage implements OnInit {
  constructor(
    private livroService: LivroService,
    private router: Router,
    private alertController: AlertController
  ) { }
  
  dadosUsuario: LoginRetornoDTO = {
    ideUsuario: '',
    nomeUsuario: '',
    sobrenomeUsuario: '',
    email: '',
    token: '',
    isOk: false,
    mensagemRetorno: ''
  }

  meusLivros: RetornoItemsListarLivros[] = [];

  ngOnInit() {   
    this.dadosUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    this.listarMeusLivros(this.dadosUsuario.ideUsuario);
    this.listarMeusLivrosLocalStorage();
  }

  listarMeusLivrosLocalStorage() {
    this.meusLivros = [];
    this.meusLivros = JSON.parse(localStorage.getItem('meus_livros')!);
  }

  listarMeusLivros(ide_usuario: string) { 
      this.livroService.listarPorUsuario(ide_usuario).subscribe((resposta) => {
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
            this.Alert(resposta.messages[0].message);
          }
        }
      },
      (errorResponse) => {
        if (errorResponse.error.isOk === false) {
          this.Alert(errorResponse.error.messages[0].message);
        }
      });
  }

  excluir(ide_livro: string) {  
    this.livroService.excluir(ide_livro).subscribe((resposta) => {
      if(resposta.isOk === true) {
        this.listarMeusLivros(this.dadosUsuario.ideUsuario);
        this.listarMeusLivrosLocalStorage();
        this.excluirAlert(resposta.mensagemRetorno);
      }
      else
      {
        this.Alert(resposta.mensagemRetorno);
      }
    },
    (errorResponse) => {
      if (errorResponse.error.isOk === false) {  
        this.Alert(errorResponse.error.mensagemRetorno);
      }
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarMeusLivrosLocalStorage();
      event.target.complete();
    }, 2000);
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  async presentAlert(ide_livro: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja realmente excluir este livro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluir(ide_livro);
          }
        }
      ]
    });

    await alert.present();
  }

  async Alert(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'                  
        }
      ]
    });

    await alert.present();
  }

  async excluirAlert(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.listarMeusLivrosLocalStorage();
            //this.handleRefresh(event);
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }
}
