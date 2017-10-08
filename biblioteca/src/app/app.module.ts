import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EstanteComponent } from './estante/estante.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';

import { FirebaseService } from './firebase.service';

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
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
