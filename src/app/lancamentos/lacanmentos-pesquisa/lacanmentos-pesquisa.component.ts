import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lacanmentos-pesquisa',
  templateUrl: './lacanmentos-pesquisa.component.html',
  styleUrls: ['./lacanmentos-pesquisa.component.css']
})
export class LacanmentosPesquisaComponent implements OnInit {


  lancamentos = [];
  totalRegistro = 0;

  constructor(
    private service: LancamentosService,
    private toasty:ToastyService,
    private confimation:ConfirmationService,
    private errorHandler:ErrorHandlerService
  ) { }

  filtro = new LancamentoFiltro();


  ngOnInit(): void {

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro).then(resultado => {
      this.totalRegistro = resultado.total;
      this.lancamentos = resultado.lancamentos
    })  .catch(this.errorHandler.handleError);
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
    this.service.excluir(evento.lancamento.codigo)
    .then(()=>{
      if(evento.grid.first === 0 ){
          this.pesquisar();
      }else{
        evento.grid.first = 0;
      }
      this.toasty.success('Exclusão realizada com sucesso');
    });
  }
}
