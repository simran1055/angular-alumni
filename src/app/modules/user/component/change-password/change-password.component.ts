import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submit: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
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
        (error) => this.toastr.error(error)
      );
  }
}
