import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';

import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'home-content', component: HomeContentComponent, canActivate: [AuthGuard] },
      { path: 'bookshelf', component: BookshelfComponent, canActivate: [AuthGuard] },
      { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting {}

export const routing = RouterModule.forRoot(appRoutes);
