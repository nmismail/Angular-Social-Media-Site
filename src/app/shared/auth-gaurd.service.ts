import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
