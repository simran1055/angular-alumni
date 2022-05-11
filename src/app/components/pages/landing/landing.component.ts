import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  data: any;
  newsData:any;
  page = 1;
  limit = 5;
  articleId: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
this.getData()
    
  }
  getData() {

    let payload = {
      limit: this.limit,
      page: this.page,
    };
    this.apiService.postApiFn('/get-all-image', {}).subscribe((res: any) => {
      this.data = res.data;
    });
  
    this.apiService
      .postApiFn('/get-user-post',payload)
      .subscribe((res: any) => {
        this.newsData = res.data;
      });
     
  }
  
  
 
  
}



