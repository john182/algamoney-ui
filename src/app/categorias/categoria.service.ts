import { AuthHttp } from 'angular2-jwt';
import { CategoriaModel } from './categoria.model';
import { Response ,Headers} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService{

  categoriaURL = "http://localhost:8080/categorias";


  constructor(private http:AuthHttp){}


  getAll(): Promise<any>{

    return this.http.get(this.categoriaURL)
    .toPromise()
    .then(response => response.json());
  }

}
