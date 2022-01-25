import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  @Output() close = new EventEmitter<Boolean>();
  @Output() updateUserDetail = new EventEmitter<Object>();
  @Input() userDetail: any;
  editUserForm: FormGroup;
  submit: boolean = false;
  image: any;
  imageUrl: any = this.apiService.imageUrl;
  constructor(private toastr: ToastrService, private apiService: ApiService) {
    this.editUserForm = new FormGroup({});
  }

  ngOnInit(): void {
    let {
      name,
      email,
      phoneNumber,
      address,
      collegeName,
      profileImage,
      dob,
      hideData,
    } = this.userDetail;

    let facebook, instagram, linkedin;
    if (this.userDetail?.socialmedia) {
      facebook = this.userDetail.socialmedia.facebook;
      instagram = this.userDetail.socialmedia.instagram;
      linkedin = this.userDetail.socialmedia.linkedin;
    }

    this.editUserForm = new FormGroup({
      name: new FormControl(name ? name : '', Validators.required),
      email: new FormControl(email ? email : '', Validators.required),
      phoneNumber: new FormControl(
        phoneNumber ? phoneNumber : '',
        Validators.required
      ),
      address: new FormControl(address ? address : '', Validators.required),
      collegeName: new FormControl(
        collegeName ? collegeName : '',
        Validators.required
      ),
      facebook: new FormControl(facebook ? facebook : ''),
      instagram: new FormControl(instagram ? instagram : ''),
      linkedin: new FormControl(linkedin ? linkedin : ''),
      profileImage: new FormControl(profileImage ? profileImage : ''),
      dob: new FormControl(dob ? dob.split('T')[0] : '', Validators.required),
      hideData: new FormControl(hideData ? hideData : false),
    });
    this.imageUrl += profileImage ? profileImage : 'default.png';
  }
  get email() {
    return this.editUserForm.get('email');
  }
  get name() {
    return this.editUserForm.get('name');
  }
  get phoneNumber() {
    return this.editUserForm.get('phoneNumber');
  }
  get address() {
    return this.editUserForm.get('address');
  }
  get collegeName() {
    return this.editUserForm.get('collegeName');
  }
  get facebook() {
    return this.editUserForm.get('facebook');
  }
  get instagram() {
    return this.editUserForm.get('instagram');
  }
  get linkedin() {
    return this.editUserForm.get('linkedin');
  }
  get profileImage() {
    return this.editUserForm.get('profileImage');
  }
  get dob() {
    return this.editUserForm.get('dob');
  }
  get hideData() {
    return this.editUserForm.get('hideData');
  }

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

  submitForm() {
    if (this.editUserForm.invalid) {
      this.submit = true;
      this.toastr.error('Fill the required fields!!');
    } else {
      const formData = new FormData();
      let payload = {
        email: this.editUserForm.value.email,
        name: this.editUserForm.value.name,
        phoneNumber: this.editUserForm.value.phoneNumber,
        address: this.editUserForm.value.address,
        collegeName: this.editUserForm.value.collegeName,
        dob: this.editUserForm.value.dob,
        hideData: this.editUserForm.value.hideData,
        socialmedia: {
          facebook: this.editUserForm.value.facebook,
          linkedin: this.editUserForm.value.linkedin,
          instagram: this.editUserForm.value.instagram,
        },
      };
      formData.append('uploadedImage', this.image);
      formData.append('body', JSON.stringify(payload));
      this.apiService.postApiFn(`/profile-update`, formData).subscribe(
        (res: any) => {
          if (res.userDetail) {
            this.updateUserDetail.emit(res.userDetail);
            this.closePopUp();
          }
        },
        (error) => this.toastr.error(error)
      );
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
