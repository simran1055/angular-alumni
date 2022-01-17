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
import { GuardGuard } from './services/guard/logedIn/guard.guard';
import { ViewComponent } from './view/view.component';

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
      { path: 'alumni-profile/:id', component: AlumniProfileComponent },
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
      { path: 'article/:name', component: ArticleComponent },
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
