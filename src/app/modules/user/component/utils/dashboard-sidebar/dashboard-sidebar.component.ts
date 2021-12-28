import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  imageUrl = this.apiService.imageUrl;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

  }
  userProfilePic() {
    let data = this.apiService.letUserDetailFn();
    return data?.profileImage
      ? this.imageUrl + data?.profileImage
      : '../../../../../assets/img/user.png';
  }

  userName() {
    let data = this.apiService.letUserDetailFn();
    return data?.name;
  }

  userDesignation() {
    let data = this.apiService.letUserDetailFn();
    return data?.alumniId?.designation ? data?.alumniId?.designation : '';
  }
  isActiveTab(type:any) {
    return this.router?.url.includes(type);
  }
}
