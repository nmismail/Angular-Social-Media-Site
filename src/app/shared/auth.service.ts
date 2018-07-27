import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '../../../node_modules/@angular/router';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  public isAuthenticated(): boolean {

    const user: string = sessionStorage.getItem('user');

    if (isNull(user)) {
      return false;
    } else {
      const userJSON: User = JSON.parse(user);
      if (userJSON.userId > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}
