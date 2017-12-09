import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from "primeng/components/common/api";


@Component({
  selector: 'app-lacamentos-grid',
  templateUrl: './lacamentos-grid.component.html',
  styleUrls: ['./lacamentos-grid.component.css']
})
export class LacamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistro = 0;
  @Input() itensPorPagina = 5;
  @ViewChild('tabela') grid;

  @Output() onLazyLoad = new EventEmitter();
  @Output() excluir = new EventEmitter();

  constructor(private auth:AuthService){}

  pesquisaPaginada(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    const itensPorPagina = event.rows;
    this.onLazyLoad.emit({pagina,itensPorPagina});
  }

  excluirEmit(lancamento:any){
    this.excluir.emit({lancamento,grid:this.grid});
  }
}
