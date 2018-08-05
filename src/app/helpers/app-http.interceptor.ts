import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import 'rxjs/add/operator/do';
import {AuthService} from '../services/auth.service';
import {Globals} from '../globals';
import {Router} from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private globals: Globals) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isLoggedIn
      .pipe(
        take(1),
        mergeMap((isLoggedIn: boolean) => {
          request = request.clone({
            setHeaders: this.formHeaders(isLoggedIn),
            url: this.formUrl(request.url)
          });

          return next.handle(request).do(
            (event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                return event;
              }
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.authService.clearAuthData();
                  this.router.navigate(['/login']);
                }
              }
            });
        })
      );
  }

  formHeaders(isLoggedIn: boolean): { [name: string]: string | string[] } {
    const headers = {'Content-Type': 'application/json'};

    if (isLoggedIn) {
      headers['Authorization'] = this.authService.getAuthToken();
    }

    return headers;
  }

  formUrl(url: string): string {
    if (!(url.startsWith('http//') || url.startsWith('https://') || url.startsWith('/'))) {
      url = this.globals.baseApiUrl + url;
    }

    return url;
  }
}
