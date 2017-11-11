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
import { PreloaderComponent } from './_directives/preloader/preloader.component';

import { AuthGuard } from './_guards/auth.guard';
import { FirebaseService } from './_services/firebase.service';
import { AlertService } from './_services/alert.service';
import { AlertComponent } from './_directives/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    PreloaderComponent,
    AlertComponent
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
