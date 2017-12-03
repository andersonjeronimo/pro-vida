import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { BooksUploadComponent } from 'app/upload/books-upload/books-upload.component';
import { ArticlesUploadComponent } from 'app/upload/articles-upload/articles-upload.component';

import { VideosComponent } from './archive/videos/videos.component';
import { PhotosComponent } from './archive/photos/photos.component';
import { BooksComponent } from './archive/books/books.component';
import { ArticlesComponent } from './archive/articles/articles.component';
import { ArchiveComponent } from './archive/archive.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent,
    children: [
      { path: 'books', component: BooksUploadComponent, canActivate: [AuthGuard] },
      { path: 'articles', component: ArticlesUploadComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'archive', component: ArchiveComponent,
    children: [
      { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
      { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
      { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
      { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting {}

// export const routing = RouterModule.forRoot(appRoutes);
