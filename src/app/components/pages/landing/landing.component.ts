import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  data: any;
  newsdata: any;
  page = 1;
  limit = 5;
  articleId: any;
  totalItems: any;
  url:any;
  articleData:any;
  constructor(private route: ActivatedRoute,private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.getAllPost();
    this.url = this.route.snapshot.paramMap.get('url');
    // this.getArticle();
    console.log(this.articleId)


  }
  getData() {

    let payload = {
      limit: this.limit,
      page: this.page,
    };
    this.apiService.postApiFn('/get-all-image', {}).subscribe((res: any) => {
      this.data = res.data;
    });



  }
  getAllPost() {


    this.apiService
      .postApiFn('/get-all-post', {})
      .subscribe((data: any) => {
        this.newsdata = data.data;
      });


  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((res: any) => {
      this.articleData = res;
    });
  }




}



