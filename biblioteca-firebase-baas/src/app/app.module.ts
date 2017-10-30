import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterializeModule } from 'angular2-materialize';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { UploadComponent } from './upload/upload.component';
import { FirebaseService } from './firebase.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [
    FirebaseService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
