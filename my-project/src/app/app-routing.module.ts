import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  /* { path: '', children: []}, */
  { path: '', component: LoginComponent/* , canDeactivate: [AuthGuard] */ },
  { path: 'login', component: LoginComponent/* , canDeactivate: [AuthGuard] */ },
  { path: 'bookshelf', component: BookshelfComponent, canActivate: [AuthGuard]},
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
