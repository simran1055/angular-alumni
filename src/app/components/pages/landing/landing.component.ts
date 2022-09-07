import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { postTags } from 'src/app/modules/user/component/add-article/filter';



declare let AOS:any
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
 
})

export class LandingComponent implements OnInit {
  
  data: any;
  newsdata: any;
  postStatus=1;
  page = 1;
  impotatntNotice:any;
  limit = 3;
  articleId: any;
  totalItems: any;
  url:any;
  articleData:any;
  tag:any ;
  eventData:any;
  userDetail:any;
  postTags: any = postTags();
  images = [
    {path: 'https://img.freepik.com/premium-photo/young-indian-college-student-india_75648-286.jpg?w=996'},
    {path: 'https://img.freepik.com/free-photo/front-view-male-student-green-checkered-shirt-with-black-backpack-holding-copybooks-smiling-blue-wall_140725-42439.jpg?w=996&t=st=1662487743~exp=1662488343~hmac=f8c23418e68a34ad03fee35cac1ebc9c998e33dafe52d274d3f2fc58b2917907'},
    {path: 'https://img.freepik.com/free-photo/serious-indian-graduate-graduation-robe-with-crossed-arms-looking-forward_496169-1338.jpg?w=996&t=st=1662487556~exp=1662488156~hmac=53533742f8fd583d11edfbd265daff25efb9ef10c035360fa075111bbd5f4d31'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: '../../../../assets/contributers/pravinImage.jpg'},
    {path: 'https://img.freepik.com/premium-photo/young-indian-college-student-india_75648-286.jpg?w=996'},
    {path: 'https://img.freepik.com/free-photo/young-bearded-hindu-student-with-backpack-pastel-wall_496169-1524.jpg?w=996&t=st=1662487654~exp=1662488254~hmac=e12383967b4d4edf7036020de2ece57a53addc07d5298aa4842f01a4789606c2'},
    {path: 'https://img.freepik.com/free-photo/waistup-portrait-cute-beautiful-asian-woman-orange-hoodie-introduce-produce-banner-pointing-blank-white-space-holding-product-smiling-recommend-advertisement-white-background_176420-51222.jpg?w=996&t=st=1662487619~exp=1662488219~hmac=e21960ccc6ac89180214dfa1712394d9f776307729bba1b9a547a091556b00de'},
  ]
 
  
  constructor(private route: ActivatedRoute,private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.getData();
    this.getAllPost();
    this.url = this.route.snapshot.paramMap.get('url');
    this.getArticle();
    this.getAllPostByEvent();
    this.getAllPostByEventAnnoucement()
    this.userDetail = JSON.parse(localStorage.getItem('userData')!);
    AOS.init({
      offset: 110,
      duration: 1000,
    });
   
    console.log(this.images);
  }
  getData() {

    let payload = {
      // limit: this.limit,
      // page: this.page,

    };
    this.apiService.postApiFn('/get-all-image', {}).subscribe((res: any) => {
      // this.images = res.data;
    
      // console.log(this.data);
      // this.data?.forEach((element:any) => {
      //          this.images.push(element.imageUrl)
      // });
    });
    
    
   

  }
 
  
  getAllPost() {
    var payload = {
      tags:"News",
      limit :2,
      postStatus:this.postStatus,
      
    };

    this.apiService
      .postApiFn('/get-all-post',payload)
      .subscribe((data: any) => {
        this.newsdata  = data.data
        this.totalItems = data.count;
        console.log(this.newsdata);
    
      });

        // console.log(this.newsdata);
        
  }
  getAllPostByEvent() {
    var payload = {
      tags: "Event",
      limit:this.limit,
      postStatus:this.postStatus,
      
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.eventData  = data.data
        this.totalItems = data.count;
        this.eventData = this.eventData
        // console.log(this.eventData);
        

        
        
        
      });


  }
  getAllPostByEventAnnoucement() {
    var payload = {
      tags: "Announcements",
      postStatus:this.postStatus,
      
    };

    this.apiService
      .postApiFn('/get-all-post', payload)
      .subscribe((data: any) => {
        this.impotatntNotice  = data.data
        this.totalItems = data.count;
        this.eventData = this.eventData
        // console.log(this.eventData);
        

        
        
        
      });


  }
  getArticle() {
    this.apiService.getApiFn('/' + this.url).subscribe((res: any) => {
      this.articleData = res;
    });
  }
}



