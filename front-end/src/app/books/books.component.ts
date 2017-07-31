import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BooksService } from './books.service';
import { Book } from './entity/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private errorMessage: string;
  private books: Book[];
  private book: Book;
  private search_value: string = "";

  mode: 'Observable';

  constructor(private service: BooksService) { }

  ngOnInit() {
    //this.getBookTitles();
    //this.searchBooks('Professional JavaScript for Web Developers');
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
      //book => this.books.push(book),
      error => this.errorMessage = <any>error);
  }

  searchBooks() {
    if (this.search_value != "") {
      this.service.searchBooks(this.search_value)
        .subscribe(
        books => this.books = books,
        error => this.errorMessage = <any>error
        )
      this.search_value = "";
    }
  }



}
