import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './component/user-view/user-view.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardHeaderComponent } from './component/utils/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './component/utils/dashboard-footer/dashboard-footer.component';
import { DashboardSidebarComponent } from './component/utils/dashboard-sidebar/dashboard-sidebar.component';
import { EditUserProfileComponent } from './component/edit-user-profile/edit-user-profile.component';
import { RequestAlumniComponent } from './component/request-alumni/request-alumni.component'

import { NgxSpinnerModule } from "ngx-spinner";
import { AddArticleComponent } from './component/add-article/add-article.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    // HeaderComponent,
    UserViewComponent,
    ChangePasswordComponent,
    ProfileComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    DashboardSidebarComponent,
    EditUserProfileComponent,
    RequestAlumniComponent,
    AddArticleComponent
  ],
  imports: [
    QuillModule.forRoot(),
     ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule
  ]
})
export class UserModule { }
