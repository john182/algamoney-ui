
import { Router } from '@angular/router/';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private service:AuthService,private error:ErrorHandlerService,private route:Router) { }

  ngOnInit(): void {
    if(this.service.isAccessTokenInvalido()){
      this.route.navigate(['/home'])
    }
  }

  login(usuario: string, senha: string) {
    this.service.login(usuario,senha)
    .then(()=>{this.route.navigate(['/lancamentos'])})
    .catch(this.error.handleError);
  }

}
