import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LivroFilter } from 'src/app/interfaces/livro/livro-filter.interface';
import { LoginRetornoDTO } from 'src/app/interfaces/login/login-retorno.interface';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  
  dadosUsuario: LoginRetornoDTO = {
    ideUsuario: '',
    nomeUsuario: '',
    sobrenomeUsuario: '',
    email: '',
    token: '',
    isOk: false,
    mensagemRetorno: ''
  }

  livroFilter: LivroFilter = {
    ide_Livro: '',
    autor: '',
    ano: 0,
    editora: '',
    codigoBarras: 0,
    urlCapa: '',
    titulo: '',
    observacao: '',
    ide_Usuario: ''
  }

  constructor(
    private router: Router,
    private serviceLivro: LivroService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('ide_Livro') != null) this.livroFilter.ide_Livro = this.route.snapshot.paramMap.get('ide_Livro')!
    this.dadosUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
    if(this.livroFilter.ide_Livro != '') this.buscarLivroPorGuid(this.livroFilter.ide_Livro!); 
  }

  salvar() {
    if (this.livroFilter.autor === '' || this.livroFilter.ano === 0 || this.livroFilter.editora === '' 
                                  || this.livroFilter.codigoBarras === 0 || this.livroFilter.titulo === '' ) {   
      this.presentAlert('Campos com (*) são obrigatórios!');
    }
    else
    { 
      this.livroFilter.ide_Usuario = this.dadosUsuario.ideUsuario;   
      this.serviceLivro.novo(this.livroFilter).subscribe((resposta) => {
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

  buscarLivroPorGuid(ide_livro: string) {
    if (ide_livro === '' ) {   
      this.presentAlert('ID do livro é obrigatório');
    }
    else
    { 
      this.livroFilter.ide_Usuario = this.dadosUsuario.ideUsuario;   
      this.serviceLivro.buscarPorID(ide_livro).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.livroFilter.ano = resposta.items[0].ano;
          this.livroFilter.autor = resposta.items[0].autor;  
          this.livroFilter.codigoBarras = resposta.items[0].codigo_Barras;  
          this.livroFilter.editora = resposta.items[0].editora;  
          //this.livroFilter.ide_livro = resposta.items[0].guuid;  
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
