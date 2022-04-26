import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import { ImageHandler } from 'ngx-quill-upload';

import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/blotFormatter', BlotFormatter);
@Component({
  selector: 'app-pending-article',
  templateUrl: './pending-article.component.html',
  styleUrls: ['./pending-article.component.scss']
})
export class PendingArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
