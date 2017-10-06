import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { EstanteComponent } from './estante/estante.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadComponent } from './upload/upload.component';

import { FirebaseStorageService } from './estante/firebase-storage.service';
import { FirebaseAuthService } from './autenticacao/firebase-auth.service';

import { HomeComponent } from './home/home.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';

@NgModule({
  declarations: [
    AppComponent,
    EstanteComponent,
    UploadComponent,
    HomeComponent,
    AutenticacaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [
    FirebaseAuthService,
    FirebaseStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
