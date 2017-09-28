import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GoogleBooksService } from './google-books.service';
import { Book } from './book.entity';

//google books
declare var google: any;

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {

  private errorMessage: string;
  private books: Book[];
  private book: Book;
  private collapsed: boolean = true;

  searchValue: string = "";

  mode: 'Observable';

  constructor(private service: GoogleBooksService) { }

  ngOnInit() {
    google.books.load({ "language": "pt-BR" });
  }

  alertNotFound() {
    alert("Could not embed the book!");
  }

  initializeModalViewer(book: Book) {
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

  searchBooks() {
    if (this.searchValue !== "") {
      this.service.searchBooks(this.searchValue)
        .subscribe(
        books => this.books = books,
        error => this.errorMessage = <any>error
        );
    }
  }

}











