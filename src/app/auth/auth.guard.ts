import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate() {
    if(!this.authService.isLoggedIn()) {
      let message=1
      this.router.navigate(['/authenticate', message]);
    }
    return this.authService.isLoggedIn();
  }
  
}
