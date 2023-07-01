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
    private livroService: LivroService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('ide_Livro') != null) this.livroFilter.ide_Livro = this.route.snapshot.paramMap.get('ide_Livro')!
    this.dadosUsuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
    if(this.livroFilter.ide_Livro != '') this.buscarLivroPorGuid(this.livroFilter.ide_Livro!); 
  }

  novo() {
    if (this.livroFilter.autor === '' || this.livroFilter.ano === 0 || this.livroFilter.editora === '' 
                                  || this.livroFilter.titulo === '' ) {   
      this.presentAlert('Campos com (*) são obrigatórios!');
    }
    else
    { 
      this.livroFilter.ide_Usuario = this.dadosUsuario.ideUsuario;   
      this.livroService.novo(this.livroFilter).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.novoAlert(resposta.mensagemRetorno);
          this.listarMeusLivros(this.dadosUsuario.ideUsuario, this.dadosUsuario.token);
          this.router.navigate(['meus-livros']);         
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

  editar() {
    if (this.livroFilter.autor === '' || this.livroFilter.ano === 0 || this.livroFilter.editora === '' 
                                  || this.livroFilter.titulo === '' || this.livroFilter.ide_Livro === '' ) {   
      this.presentAlert('Campos com (*) são obrigatórios!');
    }
    else
    { 
      this.livroFilter.ide_Usuario = this.dadosUsuario.ideUsuario;   
      this.livroService.editar(this.livroFilter).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.novoAlert(resposta.mensagemRetorno);
          this.listarMeusLivros(this.dadosUsuario.ideUsuario, this.dadosUsuario.token);
          this.router.navigate(['meus-livros']);         
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

  buscarLivroPorGuid(ide_livro: string) {
    if (ide_livro === '' ) {   
      this.presentAlert('ID do livro é obrigatório');
    }
    else
    {  
      this.livroService.buscarPorID(ide_livro).subscribe((resposta) => {
        if(resposta.isOk === true) {
          this.livroFilter.ano = resposta.ano;
          this.livroFilter.autor = resposta.autor;  
          this.livroFilter.codigoBarras = resposta.codigo_Barras;  
          this.livroFilter.editora = resposta.editora;  
          this.livroFilter.ide_Livro = resposta.ide_Livro;  
          this.livroFilter.observacao = resposta.observacao;
          this.livroFilter.titulo = resposta.titulo;
          this.livroFilter.urlCapa = resposta.url_Capa;
          this.livroFilter.ide_Usuario = resposta.ide_Usuario;
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
    this.livroService.listarPorUsuario(ide_usuario, this.dadosUsuario.token).subscribe((resposta) => {
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
          this.presentAlert(resposta.messages[0].message);
        }
      }
    },
    (errorResponse) => {
      if (errorResponse.error.isOk === false) {
        this.presentAlert(errorResponse.error.messages[0].message);
      }
    });
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

  async novoAlert(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
