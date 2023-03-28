import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/interfaces/livro/livro.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  presentingElement = undefined;
  isModalOpen = false;
  isModalOpenDetalhes = false;
  img = '';
  descricao: any;

  constructor(
    private serviceLivro: LivroService,
    private alertController: AlertController,
    ) { }
 
  ngOnInit() {
  }

  livros: Livro[] = [];

  tituloPesquisa = '';

  buscarLivroApiGoogle(): void {
    if (this.tituloPesquisa === '') {   
      this.presentAlert('É obrigatório digitar o título do livro!');
    }
    else
    {
      this.livros = [];
    
      this.serviceLivro.buscarLivro(this.tituloPesquisa).subscribe((resposta) => {
        var result = resposta.items.filter(x => x.volumeInfo.language.valueOf() === "pt-BR");

        result.forEach( (value) => {
          const livro: Livro = {
            titulo: value.volumeInfo.title,
            descricao: value.volumeInfo.description,
            urlCapa: value.volumeInfo.readingModes.image === true ? value.volumeInfo.imageLinks.smallThumbnail : "https://http2.mlstatic.com/D_NQ_NP_831305-MLB25023548230_082016-O.jpg"
          };

          this.livros.push(livro);
        });
      },
      (errorResponse) => {
        if (errorResponse.ok === false) {   
          this.presentAlert('Erro ao processar sua pesquisa. Tente novamente!');
        }
      });
    }
  }

  async presentAlert(resposta: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: resposta,
      buttons: ['OK'],
    });

    await alert.present();
  }

  abrirModalFoto(urlFoto : string, isOpen: boolean) {
    this.setOpen(isOpen, urlFoto);
  }

  setOpen(isOpen: boolean, urlFoto : string) {
    this.img = '';
    this.img = urlFoto;
    this.isModalOpen = isOpen;
  }

  abrirModalDetalhes(livro : Livro, isOpenDetalhes: boolean) {
    this.setOpenDetalhes(livro, isOpenDetalhes);
  }

  setOpenDetalhes(livro : Livro, isOpenDetalhes: boolean) {
    this.descricao = livro.descricao;
    this.isModalOpenDetalhes = isOpenDetalhes;
  }

  setFechar(isFechar: boolean) {
    this.isModalOpenDetalhes = isFechar;
  }

}
