import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "app/home/home.component";
import { AudiosComponent } from "app/audios/audios.component";
import { LivrosComponent } from "app/livros/livros.component";
import { ImagensComponent } from "app/imagens/imagens.component";
import { VideosComponent } from "app/videos/videos.component";
import { ArtigosComponent } from "app/artigos/artigos.component";

const routes: Routes = [
  /* {
    path: '',
    children: []
  } */
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artigos', component: ArtigosComponent },
  { path: 'audios', component: AudiosComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'imagens', component: ImagensComponent },
  { path: 'videos', component: VideosComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
