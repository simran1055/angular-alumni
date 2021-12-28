import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserViewComponent } from './component/user-view/user-view.component';

const routes: Routes = [
  {
    path: "", component: UserViewComponent,
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "", redirectTo: "profile" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
