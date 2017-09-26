import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { LivrosService } from '../livros/livros.service';
import { Livro } from '../livros/livros.entity';

//google books
declare var google: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //google books
  private viewer: any;   

  constructor(private service: LivrosService) { }

  ngOnInit() {
    google.books.load({ "language": "pt-BR" });
    this.service.emitter.subscribe(
      livro => this.initializeViewer(livro)      
    );
  }

  modalActions = new EventEmitter<string | MaterializeAction>();
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });    
  }

  //google books
  //https://developers.google.com/books/docs/viewer/developers_guide
  initializeViewer(book: Livro) {
    this.openModal();
    this.viewer = new google.books.DefaultViewer(document.getElementById('google-book-viewer'));
    let type = book.industryIdentifiers[0].type.substring(0, 4);
    let identifier = book.industryIdentifiers[0].identifier;
    this.viewer.load(type + ":" + identifier, this.alertError, this.alertSuccess);    
  }

  private alertError() {
    alert("Não foi possível abrir o livro selecionado.");    
  }

  private alertSuccess() {    
    alert("Livro carregado com sucesso!");    
  }

}