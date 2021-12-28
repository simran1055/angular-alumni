import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageUrl = this.apiServiece.imageUrl;
  userDetail: any;
  isEdit: Boolean = false;
  isAlumni: Boolean = false;
  view: Boolean = false;
  constructor(
    private apiServiece: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.userDetail = {}
  }

  ngOnInit(): void {
    this.spinner.show()
    this.userDetail = JSON.parse(localStorage.getItem('userData')!);
    this.view = true;
    this.spinner.hide() }

  getUserDetails() {
    this.spinner.show()
    this.apiServiece.getApiFn('/get-profile').subscribe((res: any) => {
      this.userDetail = res.userDetail;
      localStorage.setItem('userData', JSON.stringify(this.userDetail));
      this.view = true;
      this.spinner.hide()
    }, error => this.toastr.error(error))
  }
  close(e: any) {
    // if (e.target.className == "editProfile") {
    this.isEdit = true
    // }
  }
}
