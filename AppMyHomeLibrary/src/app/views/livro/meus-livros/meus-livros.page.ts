import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RetornoItemsListarLivros } from 'src/app/interfaces/livro/retorno-items-listar-livros.interface';
import { RetornoItems } from 'src/app/interfaces/login/retorno-items.interface';
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
  
  dadosUsuario: RetornoItems = {
    nomeUsuario: '',
    email: '',
    guidUsuario: ''
  }

  meusLivros: RetornoItemsListarLivros[] = [];

  ngOnInit() {   
    this.dadosUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    this.listarMeusLivros(this.dadosUsuario.guidUsuario);
  }

  listarMeusLivros(guidUsuario: string) { 
    this.meusLivros = []; 

      this.livroService.listarLivros(guidUsuario).subscribe((resposta) => {
        if(resposta.isOk === true) {
          if(resposta.items.length > 0) {
            this.meusLivros = resposta.items;
          }
        }
      },
      (errorResponse) => {
        if (errorResponse.isOk === false) {
          this.Alert(errorResponse.error);
        }
      });
  }

  excluir(guidLivro: string) {  
    this.livroService.excluir(guidLivro).subscribe((resposta) => {
      if(resposta.isOk === true) {
        this.listarMeusLivros(this.dadosUsuario.guidUsuario);
        this.Alert(resposta.items[0]);
      }
    },
    (errorResponse) => {
      if (errorResponse.isOk === false) {  
        this.Alert(errorResponse.error);
      }
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarMeusLivros(this.dadosUsuario.guidUsuario);
      event.target.complete();
    }, 2000);
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  async presentAlert(guidLivro: string) {
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
            this.excluir(guidLivro);
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
}
