import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookShelfComponent } from "app/book-shelf/book-shelf.component";
import { CanvasComponent } from "app/canvas/canvas.component";

const routes: Routes = [  
  { path: '', component: BookShelfComponent },
  { path: 'biblioteca', component: BookShelfComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


