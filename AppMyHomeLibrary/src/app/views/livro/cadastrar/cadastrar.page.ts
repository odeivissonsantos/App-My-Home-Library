import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LivroFilter } from 'src/app/interfaces/livro/livro-filter.interface';
import { RetornoItems } from 'src/app/interfaces/login/retorno-items.interface';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  
  dadosUsuario: RetornoItems = {
    nomeUsuario: '',
    email: '',
    guidUsuario: ''
  }

  livroFilter: LivroFilter = {
    guuid: '',
    autor: '',
    ano: 0,
    editora: '',
    codigoBarras: 0,
    urlCapa: '',
    titulo: '',
    observacao: '',
    guuid_Usuario: ''
  }

  constructor(
    private router: Router,
    private serviceLivro: LivroService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.dadosUsuario =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
  }

  salvar() {
    if (this.livroFilter.autor === '' || this.livroFilter.ano === 0 || this.livroFilter.editora === '' 
                                  || this.livroFilter.codigoBarras === 0 || this.livroFilter.titulo === '' ) {   
      this.presentAlert('Campos com (*) são obrigatórios!');
    }
    else
    { 
      this.livroFilter.guuid_Usuario = this.dadosUsuario.guidUsuario;   
      this.serviceLivro.salvar(this.livroFilter).subscribe((resposta) => {
        console.log(resposta);
        if(resposta.isOk === true) {
          this.presentAlert(resposta.items[0].mensagem);
          this.router.navigate(['meus-livros']);
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
