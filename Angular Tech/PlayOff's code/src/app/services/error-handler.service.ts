import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlingModel } from '../model/ErrorHandlingModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  errorHandlerModel: ErrorHandlingModel;
  constructor(private injector: Injector) {
  }
  handleError(error: any) {
    try {
      console.error(error);
      this.errorHandlerModel = { errorMessage: error.stack, errorFileName: '', errorLineNumber: 0 }
      const auth = this.injector.get(AuthService)
      auth.postDataToServiceWithToken(environment.apiErrorLogger, this.errorHandlerModel, Headers)
        .subscribe((res) => { })
    } catch (e) { }
  }
}