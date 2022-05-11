import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-all-user-articles',
  templateUrl: './all-user-articles.component.html',
  styleUrls: ['./all-user-articles.component.scss'],
})
export class AllUserArticlesComponent implements OnInit {
  data: any;
  totalItems: any;
  constructor(private apiService: ApiService, private toaster: ToastrService) {}

  page = 1;
  limit = 10;
  articleId: any;
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let payload = {
      limit: this.limit,
      page: this.page,
    };

    this.apiService
      .postApiFn('/get-user-post', payload)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalItems = res.totalCount;
      });
  }

  pageChangeFn(e: any) {
    this.page = e;
    this.getData();
  }

  deleteArticle() {
    this.apiService
      .postApiFn('/delete-post', { id: this.articleId })
      .subscribe((res: any) => {
        if (res.message) {
          this.getData();
          this.toaster.success(res.message);
        }
      });
  }
}
