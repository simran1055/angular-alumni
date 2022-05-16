import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { IgxCarouselModule } from 'igniteui-angular';
import { postTags } from 'src/app/modules/user/component/add-article/filter';
import { min } from 'rxjs';

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
  tag:any;
  postTags: any = postTags();
  constructor(private route: ActivatedRoute,private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.getAllPost();
    this.url = this.route.snapshot.paramMap.get('url');
    this.getArticle();
   

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
    var payload = {
      tags: this.tag,
      limit :this.limit,
      page: this.page,
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.newsdata =  data.data;
        this.totalItems = data.count;
        this.newsdata=  this.newsdata.slice(0,3)
        console.log(this.newsdata[Math.floor(Math.random()*this.newsdata.length,)]);
        
      });


  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((res: any) => {
      this.articleData = res;
    });
  }
}



