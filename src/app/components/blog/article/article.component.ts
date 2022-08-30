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
  userDetail:any
  image: any;

 
  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url');
    this.getArticle();
    this.userDetail = JSON.parse(localStorage.getItem('userData')!);
    
    
  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((data: any) => {
      this.image = data?.userId?.profileImage
      this.data = data;
    });
  }
}
