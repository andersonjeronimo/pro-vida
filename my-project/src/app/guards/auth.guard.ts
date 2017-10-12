import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: FirebaseService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.service.isUserAuthenticated()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
}
