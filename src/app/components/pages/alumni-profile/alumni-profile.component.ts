import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-alumni-profile',
  templateUrl: './alumni-profile.component.html',
  styleUrls: ['./alumni-profile.component.scss'],
})
export class AlumniProfileComponent implements OnInit {
  id: any;
  data: any = '';
  view: Boolean = false;
  userDetail:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.userDetail = {}
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getDataFn();
    }
  }
  

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData')!);
  }

  getDataFn() {
    this.spinner.show();

    this.apiService.getApiFn(`/get-alumni-data/${this.id}`).subscribe(
      (res: any) => {
        this.data = res.userDetail;
        this.view = true;
        this.spinner.hide();
        console.log(this.data);
        
      },
      (error) => console.log(error)
    );
  }
}
