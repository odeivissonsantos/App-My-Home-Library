import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('guidLivro') != null) this.livroFilter.guuid = this.route.snapshot.paramMap.get('guidLivro')!
    this.dadosUsuario =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
    if(this.livroFilter.guuid != '') this.buscarLivroPorGuid(this.livroFilter.guuid!); 
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

  buscarLivroPorGuid(guidLivro: string) {
    if (guidLivro === '' ) {   
      this.presentAlert('Guid do livro é obrigatório');
    }
    else
    { 
      this.livroFilter.guuid_Usuario = this.dadosUsuario.guidUsuario;   
      this.serviceLivro.buscarLivroPorGuid(guidLivro).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.livroFilter.ano = resposta.items[0].ano;
          this.livroFilter.autor = resposta.items[0].autor;  
          this.livroFilter.codigoBarras = resposta.items[0].codigo_Barras;  
          this.livroFilter.editora = resposta.items[0].editora;  
          this.livroFilter.guuid = resposta.items[0].guuid;  
          this.livroFilter.observacao = resposta.items[0].observacao;
          this.livroFilter.titulo = resposta.items[0].titulo;
          this.livroFilter.urlCapa = resposta.items[0].url_Capa;
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
      buttons: [        {
        text: 'Ok',
        role: 'cancel'
      }],
    });

    await alert.present();
  }

}
