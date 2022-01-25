import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  signUpFn() {
    if (this.signUpForm.invalid) {
      this.toastr.error("Fill the required Fields!!!");
      return;
    }
    this.apiService.postApiFn('/sign-up', this.signUpForm.value).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.router.navigate(['/sign-in'])
    }, error => this.toastr.error(error))
  }
  signInFn() {
    this.router.navigate(['/sign-in'])
  }
}
