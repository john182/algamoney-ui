import { AuthGuard } from './../seguranca/auth.guard';

import {JwtHelper} from 'angular2-jwt';
import { AuthService } from './../seguranca/auth.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentosService } from './../lancamentos/lancamentos.service';
import { ErrorHandlerService } from './error-handler.service';

import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule} from '@angular/router';

import {ToastyModule} from 'ng2-toasty';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';


@NgModule({
  imports: [
    CommonModule,

    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports:[NavbarComponent,ToastyModule,ConfirmDialogModule],
  providers:[
    ErrorHandlerService,
    LancamentosService,
    PessoasService,
    ConfirmationService,
    CategoriaService,
    AuthService,
    JwtHelper,
    {provide:LOCALE_ID,useValue:'pt-BR'}
  ]
})
export class CoreModule { }
