import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ApiInteractionsService } from './api-interactions.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService implements ErrorHandler {

  constructor(
    // private api: ApiInteractionsService,
    private injector : Injector) { }
  
  handleError(error: any): void {
    try {
      const auth = this.injector.get(ApiInteractionsService)
      console.error(error);
      auth.errorHandlerModel = { errorMessage: error.message, errorDetail: error.stack };
      auth.postHandledErrors().subscribe();
    } catch (e) {
      console.log(e)
    }
  }
}
