import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  imageUrl: any  = "https://www.efilecabinet.com/wp-content/uploads/2019/05/upload-01.png";
  image: any;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.image = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      let imgURL = reader.result;
      this.imageUrl = imgURL?.toString();
    };
  }

  upload() {
    if (
      this.image.type === 'image/jpeg' ||
      this.image.type === 'image/png' ||
      this.image.type === 'image/jpg'
    ) {
      if (this.image.size < 1000000) {
        const uploadData = new FormData();
        uploadData.append('image', this.image, this.image.name);
        this.spinner.show();
        this.apiService.imageUploadService(uploadData).subscribe((res: any) => {
          this.spinner.hide();

          console.log(res);
        });
      } else {
        this.toastr.error('Image is too large!!');
      }
    } else {
      this.toastr.error('Only JPEG, PNG, JPG File are accepted!!');
    }
  }
}
