import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean = this.apiService.getToken() ? true : false;
  openNav: Boolean = false;
  role: any;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {}

  isOpen() {
    this.openNav = !this.openNav;
  }

  isLoginFn() {
    return this.apiService.getToken() ? true : false;
  }
  userDetail() {
    let userDetails = this.apiService.letUserDetailFn();
    this.role = userDetails.role;
  }
  logOutFn() {
    localStorage.clear();
  }
}
