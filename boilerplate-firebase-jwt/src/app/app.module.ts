import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_directives/alert/alert.component';

import { FirebaseService } from './_services/index';
import { AuthenticationService } from './_services/index';
import { AlertService } from './_services/index';
import { UserService } from './_services/index';
import { AuthGuard } from './_guards/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
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
    AlertService,
    AuthenticationService,
    UserService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
