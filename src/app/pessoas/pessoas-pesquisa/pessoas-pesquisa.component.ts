import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { PessoasService, PessoaFiltro } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {

  pessoas = [];
  filtro = new PessoaFiltro;
  totalRegistro = 0;

  constructor(
    private service :PessoasService,
    private confimation:ConfirmationService,
    private toasty:ToastyService,
    private errorHandler:ErrorHandlerService
  ){}

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then(resultado => {
      this.totalRegistro = resultado.total;
      this.pessoas = resultado.pessoas

    });


  }

  onLazyLoad(evento){
    this.filtro.itensPorPagina = evento.itensPorPagina;
    this.pesquisar(evento.pagina);
  }

  confirmarExclusao(evento){
    this.confimation.confirm({
      message:`Deseja realizar a exclusão ?`,
      accept:()=>{
        this.excluir(evento);
      }

    });
  }
  excluir(evento){
    this.service.excluir(evento.pessoa.codigo)
    .then(()=>{
      if(evento.grid.first === 0 ){
          this.pesquisar();
      }else{
        evento.grid.first = 0;
      }
      this.toasty.success('Exclusão realizada com sucesso');
    }).catch(this.errorHandler.handleError);
  }
}
