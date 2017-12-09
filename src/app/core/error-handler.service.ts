import { NotAuthenticatedError } from './../seguranca/money-http';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ToastyService } from 'ng2-toasty';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'


@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor(private toasty: ToastyService, private router: Router) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    let errorMessage: string;
    console.log('teste erro');
    if (errorResponse instanceof NotAuthenticatedError) {
      this.router.navigate(['/login']);
    }
    else if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message.json();
      switch (errorResponse.status) {
        case 401:
          this.router.navigate(['/login']);
          break;
        case 403:
          this.toasty.error(message || 'Não autorizado')
          break;
        case 404:
          this.toasty.error(message || 'Recurso não encontrado. Verique o console para mais detalhes')
          break;

      }


    } else {
      errorMessage = "Erro ao processar requisição " + errorResponse.toString();
    }
    console.log(errorMessage);
    super.handleError(errorMessage);

  }

}
