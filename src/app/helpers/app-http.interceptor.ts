import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {Globals} from '../globals';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private globals: Globals) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isLoggedIn
      .take(1)
      .mergeMap((isLoggedIn: boolean) => {
        request = request.clone({
          setHeaders: this.formHeaders(isLoggedIn),
          url: this.formUrl(request.url)
        });

        return next.handle(request);
      });
  }

  formHeaders(isLoggedIn: boolean):  {[name: string]: string | string[]} {
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
