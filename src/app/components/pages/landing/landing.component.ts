import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
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
  postStatus=1;
  page = 1;
  limit = 3;
  articleId: any;
  totalItems: any;
  url:any;
  articleData:any;
  tag:any ;
  eventData:any;
  userDetail:any
  postTags: any = postTags();
  constructor(private route: ActivatedRoute,private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.getAllPost();
    this.url = this.route.snapshot.paramMap.get('url');
    this.getArticle();
    this.getAllPostByEvent()
    this.userDetail = JSON.parse(localStorage.getItem('userData')!);
   

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
      limit :2,
      postStatus:this.postStatus,
      
    };

    this.apiService
      .postApiFn('/get-all-post',payload)
      .subscribe((data: any) => {
        this.newsdata  = data.data
        this.totalItems = data.count;
        console.log(this.newsdata);
    
      });

        // console.log(this.newsdata);
        
  }
  getAllPostByEvent() {
    var payload = {
      tags: "Event",
      limit:this.limit,
      postStatus:this.postStatus,
      
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.eventData  = data.data
        this.totalItems = data.count;
        this.eventData = this.eventData
        // console.log(this.eventData);
        

        
        
        
      });


  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((res: any) => {
      this.articleData = res;
    });
  }
}



