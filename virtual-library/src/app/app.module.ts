import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { PreloaderComponent } from './_directives/preloader/preloader.component';
import { AlertComponent } from './_directives/alert/alert.component';

import { ImagesComponent } from './archive/images/images.component';
import { ArticlesComponent } from './archive/articles/articles.component';
import { BooksComponent } from './archive/books/books.component';
import { ArchiveComponent } from './archive/archive.component';

import { AuthGuard } from './_guards/auth.guard';
import { FirebaseService } from './_services/firebase.service';
import { AlertService } from './_services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    PreloaderComponent,
    AlertComponent,
    ArchiveComponent,
    BooksComponent,
    ArticlesComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    FirebaseService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
