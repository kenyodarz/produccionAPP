import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../core/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router) {}
  canActivate() {
    if (!this.token.getToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
