import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ArticleComponent } from './components/blog/article/article.component';
import { MainBlogComponent } from './components/blog/main-blog/main-blog.component';

// all user view
import { AboutComponent } from './components/pages/about/about.component';
import { AlumniProfileComponent } from './components/pages/alumni-profile/alumni-profile.component';
import { AlumniComponent } from './components/pages/alumni/alumni.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ChildRouteGuard } from './services/guard/child-rout/child-route.guard';
import { GuardGuard } from './services/guard/logedIn/guard.guard';
import { PathGuard } from './services/guard/path/path.guard';
import { ViewComponent } from './view/view.component';
import { AluminiAssComponent } from './components/pages/alumini-ass/alumini-ass.component';
import { ConstitutionComponent } from './components/pages/constitution/constitution.component';
import { AdvisoryCommiteeComponent } from './components/pages/advisory-commitee/advisory-commitee.component';
import { StudentCellComponent } from './components/pages/student-cell/student-cell.component';
import { ExecutiveCommiteeComponent } from './components/pages/executive-commitee/executive-commitee.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/modules/user/user.module').then((m) => m.UserModule),
    // canActivate:[GuardGuard]
  },
  {
    path: '',
    component: ViewComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'alumni', component: AlumniComponent },
      { path: 'alumni-ass', component: AluminiAssComponent },
      { path: 'constitution', component: ConstitutionComponent },
      { path: 'advisory-commitee', component: AdvisoryCommiteeComponent },
      { path: 'student-cell', component: StudentCellComponent },
      { path: 'executive-commitee', component: ExecutiveCommiteeComponent },
      {
        path: 'alumni-profile/:id',
        component: AlumniProfileComponent,
        canActivate: [PathGuard],
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [GuardGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [GuardGuard],
      },
      { path: 'blog', component: MainBlogComponent },
      { path: 'blog/:tag', component: MainBlogComponent },
      { path: 'article/:url', component: ArticleComponent},
      // { path: '', component: LandingComponent },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
