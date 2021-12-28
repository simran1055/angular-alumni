import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  submit: Boolean = false;
  contactUsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.email, Validators.required]],
      message: ['', Validators.required],
      batch: [''],
      reg: [''],
    });
  }

  get firstName() {
    return this.contactUsForm.get('firstName');
  }
  get email() {
    return this.contactUsForm.get('email');
  }
  get message() {
    return this.contactUsForm.get('message');
  }

  ngOnInit(): void {}
  submitFormFn() {
    if (this.contactUsForm.invalid) {
      this.submit = true;
      this.toastr.error('Fill the Required Fields!!!');
      return;
    }
    this.apiService
      .postApiFn('/contact-us', this.contactUsForm.value)
      .subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.contactUsForm.reset();
          this.contactUsForm.validator;
        },
        (error) => this.toastr.error(error)
      );
  }
}
