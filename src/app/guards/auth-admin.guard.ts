import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn
      .take(1)
      .map((isLoggedIn: boolean) => {
        if (!isLoggedIn || !this.authService.isAdmin()) {
          this.router.navigate(['']);
          return false;
        }

        return true;
      });
  }
}