import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeModule } from 'angular2-materialize';

import { ModalComponent } from './modal.component';
import { LivrosService } from '../livros/livros.service';

@NgModule({
  imports: [CommonModule, MaterializeModule],
  /* declarations: [ModalComponent],
  exports: [ModalComponent], */
  providers: [LivrosService]
})
export class ModalModule { }
