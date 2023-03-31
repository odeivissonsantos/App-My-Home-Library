import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }
  
  dadosUsuario: RetornoItems = {
    nomeUsuario: '',
    email: '',
    guidUsuario: ''
  }

  meusLivros: RetornoItemsListarLivros[] = [];

  ngOnInit() {
    this.dadosUsuario =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
    this.listarMeusLivros(this.dadosUsuario.guidUsuario); 
  } 
  
  listarMeusLivros(guidUsuario: string) {  
      this.livroService.listarLivros(guidUsuario).subscribe((resposta) => {
        if(resposta.isOk === true) {
          if(resposta.items.length > 0) {
            localStorage.setItem('meus_livros', JSON.stringify(resposta.items));
            this.meusLivros = localStorage.getItem('meus_livros') ? JSON.parse(localStorage.getItem('meus_livros')!) : null;
          }
          console.log(this.meusLivros.length);
        }
      },
      (errorResponse) => {
        if (errorResponse.isOk === false) {   
        }
      });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarMeusLivros(this.dadosUsuario.guidUsuario);
      event.target.complete();
    }, 2000);
  }
}
