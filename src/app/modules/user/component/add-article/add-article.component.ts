import Quill from 'quill';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { ImageHandler } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
import { postTags } from './filter';

import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  postForm: FormGroup;
  submit: Boolean = false;
  postTags: any = postTags();
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

    blotFormatter: {},
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      posterImageUrl: ['', Validators.required],
    });
  }

  get title() {
    return this.postForm.get('title');
  }
  get description() {
    return this.postForm.get('description');
  }
  get content() {
    return this.postForm.get('content');
  }
  get posterImageUrl() {
    return this.postForm.get('posterImageUrl');
  }
  get tags() {
    return this.postForm.get('tags');
  }

  ngOnInit(): void {}
  addPost() {
    if (this.postForm.invalid) {
      this.toastr.error('Fill All Required Fields!!!');
      return;
    }
    var postData = this.postForm.value;
    var url = postData.title.replace(' ', '-');
    postData = {
      ...postData,
      ...{
        url,
      },
    };
    this.apiService.postApiFn('/add-post', postData).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.postForm.reset();
        this.postForm.clearValidators;
      },
      (error: any) => this.toastr.error(error)
    );
  }
}
