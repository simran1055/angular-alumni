import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ChildRouteGuard implements CanActivateChild {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivateChild() {
    if (this.apiService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
