import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoTextoComponent } from './campo-texto/campo-texto.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, CampoTextoComponent],
  exports:[MessageComponent,CampoTextoComponent]
})
export class SharedModule { }
