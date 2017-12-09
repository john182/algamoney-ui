
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastrosComponent } from './pessoa-cadastros/pessoa-cadastros.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridPessoaComponent } from './grid-pessoa/grid-pessoa.component';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,




    SharedModule
  ],
  declarations:
  [
    GridPessoaComponent,
    PessoasPesquisaComponent,
    PessoaCadastrosComponent
  ],
  exports:[]
})
export class PessoasModule { }
