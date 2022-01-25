import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  data: any;
  page = 1;
  limit = 10;
  deleteImgId: any;
  totalItems: any;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  update(id: any, isPublic: boolean) {
    this.spinner.show();
    this.apiService
      .postApiFn('/update-image', { id, public: !isPublic })
      .subscribe((res: any) => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toastr.success(res.message);
        }
      });
  }

  deleteImage() {
    this.spinner.show();
    this.apiService
      .postApiFn('/delete-image', { id: this.deleteImgId })
      .subscribe((res: any) => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toastr.success(res.message);
          this.getData();
        }
      });
  }

  getData() {
    let payload = {
      page: this.page,
      limit: this.limit,
    };
    this.spinner.show();
    this.apiService
      .postApiFn('/get-user-image', payload)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.data = res.data;
        this.totalItems = res.totalCount;
      });
  }
  pageChangeFn(e: any) {
    this.page = e;
    this.getData();
  }
}
