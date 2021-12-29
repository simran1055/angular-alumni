import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildRouteGuard } from 'src/app/services/guard/child-rout/child-route.guard';
import { AddArticleComponent } from './component/add-article/add-article.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserViewComponent } from './component/user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserViewComponent,
    canActivateChild: [ChildRouteGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'add-article', component: AddArticleComponent },
      { path: '', redirectTo: 'profile' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
