import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacaoComponent } from "app/autenticacao/autenticacao.component";
import { HomeComponent } from "app/home/home.component";
import { EstanteComponent } from "app/estante/estante.component";
import { UploadComponent } from "app/upload/upload.component";

const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AutenticacaoComponent },  
  { path: 'estante', component: EstanteComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


