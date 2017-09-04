/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */


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
  @Input() private searchValue: string = "";

  //google books
  private viewer: any;

  mode: 'Observable';

  constructor(private service: LivrosService) { }

  ngOnInit() {
    //google books
    google.books.load();    
  }

  collapseBookReader() {
    this.collapsed = !this.collapsed;
  }

  alertNotFound() {
    alert("could not embed the book!");
  }

  //google books
  //https://developers.google.com/books/docs/viewer/developers_guide
  loadFromGoogleBooks(book: Livro) {    
    this.viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    let type = book.industryIdentifiers[0].type.substring(0,4);
    let identifier = book.industryIdentifiers[0].identifier;
    this.viewer.load( type + ":" + identifier, this.alertNotFound);    
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

  searchBooks() {
    this.service.searchBooks(this.searchValue)
      .subscribe(
      books => this.books = books,
      error => this.errorMessage = <any>error
      );
  }



}
