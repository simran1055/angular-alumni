import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  data: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.postApiFn('/get-all-image', {}).subscribe((res: any) => {
      this.data = res.data;
    });
  }
}
