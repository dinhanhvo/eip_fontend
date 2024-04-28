import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AppStoreService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private appStore: AppStoreService) {}

  canActivate() {
    // if (localStorage.getItem('isLoggedin')) {
    //     return true;
    // }
    console.log('check auth', this.appStore.isAuth());
    if (this.appStore.isAuth()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
