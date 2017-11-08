import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { HomeContentComponent } from './home-content/home-content.component';

import { AuthGuard } from './_guards/auth.guard';
import { FirebaseService } from './_services/firebase.service';
import { PreloaderComponent } from './_directives/preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    HomeContentComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
