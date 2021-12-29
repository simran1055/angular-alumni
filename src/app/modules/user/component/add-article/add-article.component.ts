import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  changePasswordForm: FormGroup;
  submit: Boolean = false;

  modules = {
    // #3 Add "image" to the toolbar
   
    imageHandler: {
      upload: async (file: any) => {
        return new Promise((resolve, reject): any => {
          if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
          ) {
            // File types supported for image
            if (file.size < 1000000) {
              // Customize file size as per requirement

              // Sample API Call
              const uploadData = new FormData();
              uploadData.append('image', file, file.name);

              return this.http
                .post('https://api.imgbb.com/1/upload?key=c2732b3f84b80a7e50d4adc42950daf9', uploadData)
                .toPromise()
                .then((result: any) => {
                  resolve(result.data.url); // RETURN IMAGE URL from response
                })
                .catch((error) => {
                  reject('Upload failed');
                  // Handle error control
                  console.error('Error:', error);
                });
            } else {
              reject('Size too large');
              // Handle Image size large logic
            }
          } else {
            reject('Unsupported type');
            // Handle Unsupported type logic
          }
        });
      },
    },
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
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
