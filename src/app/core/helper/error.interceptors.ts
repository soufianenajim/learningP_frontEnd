import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
     
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
      }
      if (err.status === 0) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
      }
      if (err.status === 403) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
      }
      if (err.status === 408) {
        this.authenticationService.logout();
      }
      const error = err.error || err;
      return throwError(error);
    }));
  }
}
export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ];