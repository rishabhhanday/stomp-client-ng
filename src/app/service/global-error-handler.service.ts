import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error: Error) {
    console.log(error);
    alert(error.message);
  }
}
