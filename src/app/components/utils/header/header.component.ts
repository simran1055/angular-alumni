import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean = this.apiService.getToken() ? true : false;
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

 

  isLoginFn() {
    return this.apiService.getToken() ? true : false;
  }
  logOutFn() {
    localStorage.clear();
    console.log(this.apiService.getOptionFn());
  }
}
