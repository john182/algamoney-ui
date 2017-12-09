import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { MoneyHttp } from "./money-http";



export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [{ provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [AuthService, Http, RequestOptions] }, AuthGuard,LogoutService]
})
export class SegurancaModule { }
