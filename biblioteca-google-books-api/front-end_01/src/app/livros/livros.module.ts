import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { LivrosComponent } from './livros.component';
import { LivrosService } from './livros.service';

@NgModule({
  imports: [
    CommonModule, 
    MaterializeModule, 
    FormsModule
  ],
  declarations: [LivrosComponent], 
  exports: [LivrosComponent],
  providers: [LivrosService]
})
export class LivrosModule { }
