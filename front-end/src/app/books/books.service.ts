import { Injectable } from '@angular/core';

@Injectable()
export class BooksService {

  constructor() { }

  getBookTitles() {
    return [
      {
        ID: 1,
        title: 'Book One'
      },
      {
        ID: 2,
        title: 'Book Two'
      },
      {
        ID: 3,
        title: 'Book Three'
      }
    ]
  }

}