import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { years, courses } from './filter';
@Component({
  selector: 'app-request-alumni',
  templateUrl: './request-alumni.component.html',
  styleUrls: ['./request-alumni.component.scss']
})
export class RequestAlumniComponent implements OnInit {
  @Output() close = new EventEmitter<Boolean>();
  @Output() updateUserDetail = new EventEmitter<Object>();
  @Input() userDetail: any;

  visible: Boolean = false;
  editAlumniForm: FormGroup;
  submit: boolean = false;
  stateInfo: any = [];
  countryInfo: any[] = [];
  cityInfo: any = [];
  years: any = years();
  cources: any = courses();
  title: string = "Request Alumni"
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.editAlumniForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.getCountries();
  }
  get companyName() { return this.editAlumniForm.get('companyName') }
  get companyEmail() { return this.editAlumniForm.get('companyEmail') }
  get companyAddress() { return this.editAlumniForm.get('companyAddress') }
  get batch() { return this.editAlumniForm.get('batch') }
  get branchOfStudy() { return this.editAlumniForm.get('branchOfStudy') }
  get country() { return this.editAlumniForm.get('country') }
  get city() { return this.editAlumniForm.get('city') }
  get designation() { return this.editAlumniForm.get('designation') }
  get passingYear() { return this.editAlumniForm.get('passingYear') }
  get regNo() { return this.editAlumniForm.get('regNo') }
  get state() { return this.editAlumniForm.get('state') }

  getCountries() {
    this.apiService.allCountries().
      subscribe(
        data2 => {
          this.countryInfo = data2.Countries;
          this.initForm();
        },
        err => console.log(err),
      )
  }

  initForm() {
    let country: any;
    let state: any;
    let city: any;

    if (this.userDetail?.alumniId?.country) {
      country = this.countryInfo?.findIndex(x => x.CountryName == this.userDetail?.alumniId?.country);
      state = this.countryInfo[country]?.States.findIndex((x: any) => x.StateName == this.userDetail?.alumniId?.state)
      city = this.countryInfo[country]?.States[state].Cities.findIndex((x: any) => x == this.userDetail?.alumniId?.city)
      this.onChangeCountry({ target: { value: country } });
      this.onChangeState({ target: { value: state } });
    }

    this.editAlumniForm = new FormGroup({
      companyName: new FormControl(this.userDetail?.alumniId?.companyName, Validators.required),
      companyEmail: new FormControl(this.userDetail?.alumniId?.companyEmail, Validators.required),
      companyAddress: new FormControl(this.userDetail?.alumniId?.companyAddress, Validators.required),
      batch: new FormControl(this.userDetail?.alumniId?.batch, Validators.required),
      branchOfStudy: new FormControl(this.userDetail?.alumniId?.branchOfStudy, Validators.required),
      country: new FormControl(country, Validators.required),
      city: new FormControl(city, Validators.required),
      designation: new FormControl(this.userDetail?.alumniId?.designation),
      passingYear: new FormControl(this.userDetail?.alumniId?.passingYear, Validators.required),
      regNo: new FormControl(this.userDetail?.alumniId?.regNo, Validators.required),
      state: new FormControl(state, Validators.required),
    })
    this.visible = true;
    this.spinner.hide();
  }

  onChangeCountry(countryValue: any) {
    countryValue = countryValue?.target?.value;
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
  }

  onChangeState(stateValue: any) {
    stateValue = stateValue.target.value;
    this.cityInfo = this.stateInfo[stateValue].Cities;
  }

  submitForm() {
    if (this.editAlumniForm.invalid) {
      this.submit = true;
      this.toastr.error("Fill the required fields!!")
    } else {
      let url = "/request-alumni";

      let payload = {
        companyName: this.editAlumniForm.value.companyName,
        companyEmail: this.editAlumniForm.value.companyEmail,
        companyAddress: this.editAlumniForm.value.companyAddress,
        batch: this.editAlumniForm.value.batch,
        branchOfStudy: this.editAlumniForm.value.branchOfStudy,
        country: this.countryInfo[parseInt(this.editAlumniForm.value.country)].CountryName,
        city: this.cityInfo[parseInt(this.editAlumniForm.value.city)],
        designation: this.editAlumniForm.value.designation,
        passingYear: this.editAlumniForm.value.passingYear,
        regNo: this.editAlumniForm.value.regNo,
        state: this.stateInfo[parseInt(this.editAlumniForm.value.state)].StateName,
      }

      if (this.userDetail?.alumniId) {
        url = "/alumni-update";
        payload = {
          ...payload, ...{
            userId: this.userDetail.alumniId.userId,
            _id: this.userDetail.alumniId._id
          }
        }
      }

      this.apiService.postApiFn(url, payload).subscribe((res: any) => {
        if (res.message) {
          this.updateUserDetail.emit({});
          this.closePopUp();
        }
      }, error => this.toastr.error(error))
    }
  }

  closePopUp() {
    this.close.emit(false);
  }

  closeFn(e: any) {
    if (e.target.className == 'pop') {
      this.closePopUp();
    }
  }
}
