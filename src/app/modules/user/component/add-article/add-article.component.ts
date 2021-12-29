import Quill from 'quill';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { ImageHandler } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
import BlotFormatter from 'quill-blot-formatter';


Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  changePasswordForm: FormGroup;
  submit: Boolean = false;

  modules = {
    imageHandler: {
      upload: async (file: any) => {
        return new Promise((resolve, reject): any => {
          if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
          ) {
            if (file.size < 1000000) {
              const uploadData = new FormData();
              uploadData.append('image', file, file.name);

              return this.http
                .post(
                  'https://api.imgbb.com/1/upload?key=c2732b3f84b80a7e50d4adc42950daf9',
                  uploadData
                )
                .toPromise()
                .then((result: any) => {
                  resolve(result.data.url); // RETURN IMAGE URL from response
                })
                .catch((error) => {
                  reject('Upload failed');
                  console.error('Error:', error);
                });
            } else {
              reject('Size too large');
            }
          } else {
            reject('Unsupported type');
          }
        });
      },
    },
  
    blotFormatter: {
    }
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  ngOnInit(): void {}
  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.toastr.error('Fill All Required Fields!!!');
      return;
    }
    if (
      this.changePasswordForm.value.newPassword !=
      this.changePasswordForm.value.confirmPassword
    ) {
      this.toastr.error('Confirm Password Is not Matched!!');
      return;
    }
    this.apiService
      .postApiFn('/change-password', this.changePasswordForm.value)
      .subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.changePasswordForm.reset();
          this.changePasswordForm.clearValidators;
        },
        (error: any) => this.toastr.error(error)
      );
  }
}
