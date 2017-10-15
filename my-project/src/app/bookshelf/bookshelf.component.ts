import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  fileList: any[] = [];
  private reference = 'books';

  constructor(private service: FirebaseService) { }

  ngOnInit() {
  }

  listFilesUrl() {
    const databaseRef = this.service.getDatabaseRef(this.reference);
    databaseRef.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        this.fileList.push(childSnapshot);
      });
    });
    console.log(this.fileList);
  }




}
