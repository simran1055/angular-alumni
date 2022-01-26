import { Component, OnInit } from '@angular/core';
import { postTags } from 'src/app/modules/user/component/add-article/filter';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.scss'],
})
export class BlogSidebarComponent implements OnInit {
  trendingPost: any;
  imageServer = this.apiService.imageUrl;
  latestPost: any;
  postTags: any = postTags();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    this.apiService.getApiFn('/trending-post').subscribe((data: any) => {
      this.trendingPost = data;
    });
    this.apiService.getApiFn('/latest-post').subscribe((data: any) => {
      this.latestPost = data;
    });
  }
}
