import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './component/user-view/user-view.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardHeaderComponent } from './component/utils/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './component/utils/dashboard-footer/dashboard-footer.component';
import { DashboardSidebarComponent } from './component/utils/dashboard-sidebar/dashboard-sidebar.component';
// import { HeaderComponent } from '../../components/utils/header/header.component'

@NgModule({
  declarations: [
    // HeaderComponent,
    UserViewComponent,
    ChangePasswordComponent,
    ProfileComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    DashboardSidebarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
