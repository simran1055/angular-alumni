import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { AlumniComponent } from './components/pages/alumni/alumni.component';
import { AlumniProfileComponent } from './components/pages/alumni-profile/alumni-profile.component';

import { ViewComponent } from './view/view.component';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { MainBlogComponent } from './components/blog/main-blog/main-blog.component';
import { ArticleComponent } from './components/blog/article/article.component';
import { ArticleSidebarComponent } from './components/blog/utils/article-sidebar/article-sidebar.component';
import { ArticleCommentsComponent } from './components/blog/utils/article-comments/article-comments.component';
import { BlogSidebarComponent } from './components/blog/utils/blog-sidebar/blog-sidebar.component';
import { QuillModule } from 'ngx-quill';
import { AluminiAssComponent } from './components/pages/alumini-ass/alumini-ass.component';
import { ConstitutionComponent } from './components/pages/constitution/constitution.component';
import { ExecutiveCommiteeComponent } from './components/pages/executive-commitee/executive-commitee.component';
import { AdvisoryCommiteeComponent } from './components/pages/advisory-commitee/advisory-commitee.component';
import { StudentCellComponent } from './components/pages/student-cell/student-cell.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    LandingComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    HeaderComponent,
    FooterComponent,
    ViewComponent,
    AlumniComponent,
    AlumniProfileComponent,
    GalleryComponent,
    MainBlogComponent,
    ArticleComponent,
    ArticleSidebarComponent,
    ArticleCommentsComponent,
    BlogSidebarComponent,
    AluminiAssComponent,
    ConstitutionComponent,
    ExecutiveCommiteeComponent,
    AdvisoryCommiteeComponent,
    StudentCellComponent,

  ],
  imports: [
    QuillModule.forRoot(),
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
