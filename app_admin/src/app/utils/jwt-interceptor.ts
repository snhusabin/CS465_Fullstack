import { HttpInterceptorFn } from '@angular/common/http';

import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don’t attach token to auth endpoints
    const url = request.url;
    const isAuthAPI = url.endsWith('/login') || url.endsWith('/register') || url.includes('/login') || url.includes('/register');

    if (this.auth.isLoggedIn() && !isAuthAPI) {
      const token = this.auth.getToken();
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};