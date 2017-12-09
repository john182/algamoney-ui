import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {

  url = 'http://localhost:8080/oauth/token'
  jwtPayLoad: any;
  constructor(private http: Http, private jwt: JwtHelper) {
    this.carregarToken();
  }


  temPermissao(permissao: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  temQualquerPermissao(roles){
    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }
    return false;
  }


  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    const senhaClient = btoa('angular:@ngul@r0');

    headers.append('Authorization', `Basic ${senhaClient}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.url, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => { this.armazenarToken(response.json().access_token) })
      .catch(response => {
        if (response.status === 400) {
          const error = response.json();

          if (error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!')
          } else {
            return Promise.reject(response);
          }
        } else {

        }
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwt.isTokenExpired(token);
  }

  obterNovoAccessToken() {
    const headers = new Headers();
    const senhaClient = btoa('angular:@ngul@r0');
    headers.append('Authorization', `Basic ${senhaClient}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = "grant_type=refresh_token";
    return this.http.post(this.url, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.armazenarToken(response.json().access_token);
        console.log('Novo access token criado!');
      })
      .catch(response => {
        console.log('Erro ao renovar Token ', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayLoad = null;
  }

  private armazenarToken(token: string) {

    this.jwtPayLoad = this.jwt.decodeToken(token);
    localStorage.setItem('token', token);

  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
