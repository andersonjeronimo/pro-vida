import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
import { ImagesComponent } from './images/images.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';

import { routing } from 'app/app.routing';

import { BooksService } from './books/books.service';
import { UploadsComponent } from './uploads/uploads.component';
import { DownloadsComponent } from './downloads/downloads.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AudioComponent,
    VideoComponent,
    ImagesComponent,
    ArticlesComponent,
    HomeComponent,
    UploadsComponent,
    DownloadsComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    BooksService    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
