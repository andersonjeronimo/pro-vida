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

  mode: 'Observable';

  constructor(private service: BooksService) { }

  ngOnInit() {
    this.getBookTitles();
  }

  getBookTitles() {
    this.service.getBookTitles()
      .subscribe(
      books => this.books = books,
      error => this.errorMessage = <any>error);
  }

  getFileById(id: number) {
    this.service.getBookById(id)
      .subscribe(
      book => this.book = book,
      error => this.errorMessage = <any>error);
  }

}
