import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate() {
    if (this.apiService.getToken()) {
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      // this.router.navigate(['/sign-in']);
      return true;
    }
  }
}
