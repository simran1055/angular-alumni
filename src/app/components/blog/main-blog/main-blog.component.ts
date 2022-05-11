import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-main-blog',
  templateUrl: './main-blog.component.html',
  styleUrls: ['./main-blog.component.scss'],
})
export class MainBlogComponent implements OnInit {
  tag: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    // this.tag = this.route.snapshot.paramMap.get('tag');
  }
  page = 1;
  limit = 10;
  totalItems: any;
  data: any;
  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      console.log(routeParams['tag']);
      this.tag = routeParams['tag'];
      this.getAllPost();
    });
    
  }
  getAllPost() {
    var payload = {
      tags: this.tag,
      page: this.page,
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.data = data.data;
        this.totalItems = data.count;
      });
    
      
  }

  pageChangeFn(e: any) {
    console.log(e);
    this.page = e;
    this.getAllPost();
  }
  
  
}
