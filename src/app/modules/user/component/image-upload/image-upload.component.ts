import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  imageUrl: any =
    'https://www.efilecabinet.com/wp-content/uploads/2019/05/upload-01.png';
  image: any;
  isPublic: Boolean = false;
  imageName: String = '';
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: Router
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

  getNameFn(e: any) {
    this.imageName = e.target.value;
  }

  upload() {
    if (!this.image) {
      this.toastr.error('Image is Required!!!');
      return;
    }
    if (this.imageName == '' || this.imageName == null) {
      this.toastr.error('Name is Required!!!');
      return;
    }
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
          let payload = {
            imageUrl: res.data.display_url,
            delete_url: res.data.delete_url,
            name: this.imageName,
            public: this.isPublic,
          };
          this.apiService
            .postApiFn('/add-image', payload)
            .subscribe((data: any) => {
              this.spinner.hide();
              if (data.status == 200) {
                this.route.navigate(['/dashboard/image-list']);
                this.toastr.success('Uploaded Success!!!');
              }
            });
        });
      } else {
        this.toastr.error('Image is too large!!');
      }
    } else {
      this.toastr.error('Only JPEG, PNG, JPG File are accepted!!');
    }
  }
}
