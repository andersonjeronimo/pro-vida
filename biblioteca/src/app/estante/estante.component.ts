import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { FirebaseStorageService } from './firebase-storage.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.component.html',
  styleUrls: ['./estante.component.css']
})
export class EstanteComponent implements OnInit {

  private books: any[] = [];

  book: Object = {
    isbn: '',
    title: '',
    author: ''
  };

  private errorMessage: string = "";  

  constructor(private service: FirebaseStorageService) { }

  ngOnInit() {
    //this.listBooks();    
  }

  listBooks() {
    this.service.listBooks()
      .subscribe(
      books => this.books = books,
      error => this.errorMessage = <any>error
      );
  }


  /* createBook(book: any) {
    this.service.createBook(book)
      .subscribe(
      success => {
        this.listBooks();
      },
      book => this.book.push(book),
      error => this.errorMessage = <any>error
      );
  } */

  createBook() {
    this.service.createBook(this.book);
  }

  getBook(id: string) {
    this.service.getBook(id)
      .subscribe(
      book => this.book = book,
      error => this.errorMessage = <any>error
      );
  }

  deleteBook(id: string) {
    this.service.deleteBook(id)
      .subscribe(
      /* success => {
        this.listBooks();
      }, */
      book => this.removeFromArray(book),
      error => this.errorMessage = <any>error
      );
  }

  removeFromArray(book: any) {
    let index = this.books.indexOf(book);
    this.books.splice(index, 1);
  }

}
