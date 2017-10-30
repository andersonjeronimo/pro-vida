import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { GoogleBooksService } from '../book-shelf/google-books.service';
import { Book } from '../book-shelf/book.entity';

//google books
declare var google: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  //google books
  private viewer: any;  
  pageNumber: number = 0; 

  constructor(private service: GoogleBooksService) { }

  ngOnInit() {
    google.books.load({ "language": "pt-BR" });
    this.service.emitter.subscribe(
      book => this.initializeViewer(book)      
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
  initializeViewer(book: Book) {
    this.openModal();
    this.viewer = new google.books.DefaultViewer(document.getElementById('google-book-viewer'));    
    let type = book.industryIdentifiers[0].type.substring(0, 4);
    let identifier = book.industryIdentifiers[0].identifier;
    this.viewer.load(type + ":" + identifier, this.alertError, this.alertSuccess);        
  }

  resize(){
    this.viewer.resize();    
  }

  goToPage(){
    this.viewer.goToPage(15);
  }

  nextPage(){
    this.viewer.nextPage();
  }
  
  previousPage(){
    this.viewer.previousPage();
  }

  zoomIn(){
    this.viewer.zoomIn();
  } 
  
  zoomOut(){
    this.viewer.zoomOut();
  }

  private alertError() {
    alert("Não foi possível abrir o livro selecionado.");    
  }

  private alertSuccess() {    
    alert("Livro carregado com sucesso!");    
  }

}