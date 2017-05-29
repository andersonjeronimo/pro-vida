import { Component, OnInit } from '@angular/core';

import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any[] = [];

  constructor(private service: BooksService) { }

  ngOnInit() {
    this.books = this.service.getBookTitles();
  }

}
