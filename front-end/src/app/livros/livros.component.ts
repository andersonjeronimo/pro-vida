import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LivrosService } from './livros.service';
import { Livro } from './livros.entity';

//google books
declare var google: any;

@Component({
  selector: 'app-books',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']  
})
export class LivrosComponent implements OnInit {

  private errorMessage: string;
  private books: Livro[];
  private book: Livro;
  private collapsed: boolean = true;
  
  //@Input() searchValue: string = "pro-life";

  mode: 'Observable';

  constructor(private service: LivrosService) { }

  ngOnInit() {
    //google books
    google.books.load({"language": "pt-BR"}); 
    //this.searchBooks();
  }

  /* collapseBookReader() {
    this.collapsed = !this.collapsed;
  } */

  alertNotFound() {
    alert("could not embed the book!");
  }

  initializeModalViewer(book: Livro){
    this.service.emitter.emit(book);
  }
  

  getBookTitles() {
    this.service.getBookTitles()
      .subscribe(
      books => this.books = books,
      error => this.errorMessage = <any>error
      );
  }

  getBookById(id: string) {
    this.service.getBookById(id)
      .subscribe(
      book => this.book = book,      
      error => this.errorMessage = <any>error);
  }

  searchBooks(searchValue: string) {
    //this.service.searchBooks(this.searchValue)
    this.service.searchBooks(searchValue)
      .subscribe(
      books => this.books = books,
      error => this.errorMessage = <any>error
      );
  }



}
