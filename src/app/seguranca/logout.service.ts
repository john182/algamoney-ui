import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  url = "http://localhost:8080/tokens/revoke"

  constructor(private http: AuthHttp, private auth: AuthService, private router: Router) { }


  logout() {
    return this.http.delete(this.url, { withCredentials: true })
      .toPromise()
      .then(() => { this.auth.limparAccessToken() })
  }

}
