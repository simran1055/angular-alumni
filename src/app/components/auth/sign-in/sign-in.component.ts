import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.route.queryParams
      .subscribe((params: any) => {
        if (params.vf && params.id) {
          this.verify(params.vf, params.id)
        }
      });

    this.signInForm = this.formBuilder.group({
      // name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  verify(vf: any, id: any) {
    this.apiService.postApiFn('/verify-email', { vf, id }).subscribe((res: any) => {
      if (res.message) {
        this.toastr.success(res.message);
      }
    }, error => this.toastr.error(error))
  }
  signInFn() {
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
  register() {
    this.router.navigate(['/sign-up']);
  }
}
