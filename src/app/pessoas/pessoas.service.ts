import { AuthHttp } from 'angular2-jwt';
import { ErrorHandlerService } from './../core/error-handler.service';
import { Injectable } from '@angular/core';

import {  URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise'


export class PessoaFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl: string = 'http://localhost:8080/pessoas';




  constructor(private http: AuthHttp) {

  }


  getAll(): Promise<any>{

    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(response => response.json().content);
  }

  pesquisar  (filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();


    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('nome', filtro.descricao);
    }

    return this.http.get(this.pessoasUrl, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;
        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };
        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);



  }



}
