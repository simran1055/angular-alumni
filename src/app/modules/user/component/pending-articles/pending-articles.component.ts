import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-pending-articles',
  templateUrl: './pending-articles.component.html',
  styleUrls: ['./pending-articles.component.scss']
})
export class PendingArticlesComponent implements OnInit {
  data: any;
  totalItems: any;
  constructor(private apiService: ApiService, private toaster: ToastrService,private router: Router) {}

  page = 1;
  limit = 10;
  articleId: any;
  ResSuccess:any;
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let payload = {
      limit: this.limit,
      page: this.page,
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalItems = res.totalCount;
        console.log(this.data);
        
       
        
      });
  }

  pageChangeFn(e: any) {
    this.page = e;
    this.getData();
  }

  AproveArticle() {
    let payload = {
      approvedPostStatus: 1,
      pId: this.articleId, 
    };
    this.apiService
      .postApiFn('/approved-post', { payload })
      .subscribe((res: any) => {
        if (res.message) {
          
          console.log(res.message);
          
          this.toaster.success(res.message);
         
          
        }
      });
  }
  RejectArticle() {
    let payload = {
      approvedPostStatus:0,
      pId: this.articleId, 
    };
    this.apiService
      .postApiFn('/approved-post', { payload })
      .subscribe((res: any) => {
        if (res.message) {
          
          console.log(res.message);
          
          this.toaster.success(res.message);
         
          
        }
      });
  }
  SuspendArticle() {
    let payload = {
      approvedPostStatus:2,
      pId: this.articleId, 
    };
    this.apiService
      .postApiFn('/approved-post', { payload })
      .subscribe((res: any) => {
        if (res.message) {
          
          console.log(res.message);
          
          this.toaster.success(res.message);
         
          
        }
      });
  }

}
