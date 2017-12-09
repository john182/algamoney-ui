import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid-pessoa',
  templateUrl: './grid-pessoa.component.html',
  styleUrls: ['./grid-pessoa.component.css']
})
export class GridPessoaComponent implements OnInit {

  @Input() pessoas = [];
  @Input() totalRegistro = 0;
  @Input() itensPorPagina = 5;
  @ViewChild('table') grid;

  constructor() { }

  ngOnInit() {

  }

  @Output() onLazyLoad = new EventEmitter();

  @Output() excluir = new EventEmitter();

  pesquisaPaginada(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    const itensPorPagina = event.rows;
    this.onLazyLoad.emit({ pagina, itensPorPagina });
  }

  excluirEmit(pessoa :any){

    this.excluir.emit({pessoa,grid:this.grid});
  }

}
