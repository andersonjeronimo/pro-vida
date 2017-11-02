import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRouting } from './app-routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { PreloaderComponent } from './_directives/preloader/preloader.component';
import { UploadComponent } from './upload/upload.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { HomeContentComponent } from './home-content/home-content.component';

import { FirebaseService } from './_services/index';
import { AlertService } from './_services/index';
import { UserService } from './_services/index';
import { AuthGuard } from './_guards/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PreloaderComponent,
    UploadComponent,
    BookshelfComponent,
    HomeContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
