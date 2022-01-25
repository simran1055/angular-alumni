import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  url: any;
  data: any;
  content: any;
  image: any = this.apiService.imageUrl;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('name');
    this.getArticle();
  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((data: any) => {
      this.image += data?.userId?.profileImage
      this.data = data;
    });
  }
}
