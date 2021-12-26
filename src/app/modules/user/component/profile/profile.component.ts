import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private apiSeriece: ApiService
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.apiSeriece.getApiFn('/get-profile').subscribe((res: any) => {
      console.log(res);
    })
  }

}
