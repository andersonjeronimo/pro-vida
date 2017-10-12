import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', children: []},
  {path: 'bookshelf', component: BookshelfComponent},
  {path: 'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
