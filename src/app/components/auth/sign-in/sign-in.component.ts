import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router:Router
  ) {
    this.signInForm = this.formBuilder.group({
      // name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  signInFn() {
    console.log(this.signInForm);
    if (this.signInForm.invalid) {
      this.toastr.error("Fill the required Fields!!!");
      return;
    }
    this.apiService.postApiFn('/log-in', this.signInForm.value).subscribe((res: any) => {
      this.toastr.success(res.message);
      localStorage.setItem("access_token", res.token);
      localStorage.setItem("userData", JSON.stringify(res.userData));
      this.router.navigate(['/dashboard']);
    }, error => this.toastr.error(error))
  }

}
