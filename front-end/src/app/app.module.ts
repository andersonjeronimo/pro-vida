import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from './home/home.component';
/* import { LivrosComponent } from './livros/livros.component'; */
import { AudiosComponent } from './audios/audios.component';
import { VideosComponent } from './videos/videos.component';
import { ImagensComponent } from './imagens/imagens.component';
import { ArtigosComponent } from './artigos/artigos.component';

import { LivrosModule } from './livros/livros.module';
/* import { ModalModule } from './modal/modal.module'; */

/* import { LivrosService } from './livros/livros.service'; */

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HomeComponent,
    /* LivrosComponent, */
    AudiosComponent,
    VideosComponent,
    ImagensComponent,
    ArtigosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    LivrosModule,
    /* ModalModule */
  ],
  /* providers: [LivrosService], */
  bootstrap: [AppComponent]
})
export class AppModule { }
