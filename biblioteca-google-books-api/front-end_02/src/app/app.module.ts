import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CanvasComponent } from './canvas/canvas.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';

import { GoogleBooksService } from './book-shelf/google-books.service';

@NgModule({
  declarations: [
    AppComponent,        
    CanvasComponent,
    BookShelfComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
