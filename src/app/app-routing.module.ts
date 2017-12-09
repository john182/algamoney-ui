import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { AuthGuard } from './seguranca/auth.guard';
import { LoginComponent } from './seguranca/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LacanmentosPesquisaComponent } from './lancamentos/lacanmentos-pesquisa/lacanmentos-pesquisa.component';
import { PessoaCadastrosComponent } from './pessoas/pessoa-cadastros/pessoa-cadastros.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';

const ROUTES: Routes = [
  { path: '', redirectTo:'lancamentos',pathMatch:"full"  },

  {
    path: 'lancamentos',
    component: LacanmentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/:id',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  }
  ,
  { path: 'pessoas', component: PessoasPesquisaComponent,canActivate:[AuthGuard] },
  { path: 'pessoas/novo', component: PessoaCadastrosComponent,canActivate:[AuthGuard] },
  { path: 'pessoas/:id', component: PessoasPesquisaComponent,canActivate:[AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo:'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
