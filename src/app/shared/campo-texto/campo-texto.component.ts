import { Component, OnInit, AfterContentInit, forwardRef, Input, ContentChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControlName, NgModel } from "@angular/forms";

@Component({
  selector: 'app-campo-texto',
  templateUrl: './campo-texto.component.html',
  styleUrls: ['./campo-texto.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CampoTextoComponent),
    }
  ]
})
export class CampoTextoComponent implements OnInit, AfterContentInit, ControlValueAccessor {

  @Input() classe: string;
  @Input() requerido: string;
  @Input() label: string;
  @Input() tamanhoMaximo: 1;

  tamanhoColuna = "form-group ";

  innerValue: any;
  onChange: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  input: any

  constructor() { }

  ngOnInit() {
    if (this.classe) {
      this.tamanhoColuna += this.classe;
    }
  }

  get value(): any {
    return this.innerValue;
  };


  setValue(value: any) {
    this.innerValue = value;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  writeValue(obj: any): void {
    this.innerValue = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  ngAfterContentInit() {
    this.input = this.model || this.control;
    console.log(this);
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }


  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
