import { BooksComponent } from './archive/books/books.component';
import { ArticlesComponent } from './archive/articles/articles.component';
import { ImagesComponent } from './archive/images/images.component';
import { ArchiveComponent } from './archive/archive.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { ShelfComponent } from './shelf/shelf.component';
/* import { ArchiveComponent } from './archive/archive.component'; */

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shelf', component: ShelfComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'archive', component: ArchiveComponent,
    children: [
      { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
      { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
      { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] }
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
