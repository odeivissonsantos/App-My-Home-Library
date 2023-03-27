import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {

  constructor(
    private serviceLivro: LivroService,
    private router: Router,
    ) { }

    tituloPesquisa = '';
    
  ngOnInit() {
  }

  buscarLivroApiGoogle(): void {
    this.serviceLivro.buscarLivro(this.tituloPesquisa).subscribe((resposta) => {
      this.tituloPesquisa = '';
    })
  }
}
