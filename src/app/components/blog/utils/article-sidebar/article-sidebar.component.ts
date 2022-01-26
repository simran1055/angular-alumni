import { Component, OnInit } from '@angular/core';
import { postTags } from 'src/app/modules/user/component/add-article/filter';

@Component({
  selector: 'app-article-sidebar',
  templateUrl: './article-sidebar.component.html',
  styleUrls: ['./article-sidebar.component.scss']
})
export class ArticleSidebarComponent implements OnInit {

  postTags: any = postTags();

  constructor() { }

  ngOnInit(): void {
  }

}
