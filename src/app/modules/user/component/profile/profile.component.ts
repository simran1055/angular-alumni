import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetail: any;

  constructor(
    private apiSeriece: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.apiSeriece.getApiFn('/get-profile').subscribe((res: any) => {
      this.userDetail = res.userDetail;
    }, error => this.toastr.error(error))
  }

}
