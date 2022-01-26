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
export class PathGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate() {
    if (this.apiService.getToken()) {
      return true;
    } else {
      console.log('>>>');
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
