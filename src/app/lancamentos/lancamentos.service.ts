import { AuthHttp } from 'angular2-jwt';
import { Lancamento } from './../core/models';
import { ErrorHandlerService } from './../core/error-handler.service';
import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise'

import * as moment from 'moment'

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentosService {

  lancamentosUrl: string = 'http://localhost:8080/lancamentos';


  constructor(private http: AuthHttp) { }



  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.lancamentosUrl}?resumo`, {  search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;
        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };
        return resultado;
      })
      ;

  }


  getLancamento(id: number): Promise<Lancamento> {


    return this.http.get(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, )
      .toPromise()
      .then(() => null)
      ;


  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    console.log(JSON.stringify(lancamento));


    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento) )
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {


    return this.http.post(this.lancamentosUrl,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
