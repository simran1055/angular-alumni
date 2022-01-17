import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-main-blog',
  templateUrl: './main-blog.component.html',
  styleUrls: ['./main-blog.component.scss'],
})
export class MainBlogComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  data: any;
  ngOnInit(): void {
    this.getAllPost();
  }
  getAllPost() {
    var payload = {};

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.data = data.data;
        
      });
  }
}
