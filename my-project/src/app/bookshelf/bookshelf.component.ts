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
  private databaseBooksRef: any = null;
  private storageBooksRef: any = null;

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.databaseBooksRef = this.service.getDatabaseRef(this.reference);
    this.storageBooksRef = this.service.getStorageRef(this.reference);
  }

  listFiles() {
    this.databaseBooksRef.once('value').then(snapshot => {
      this.fileList = [];
      snapshot.forEach(childSnapshot => {
        this.fileList.push(childSnapshot.val());
      });
    });
    console.log(this.fileList);
  }

  openFile(fileName: string) {
    // Create a reference to the file we want to download
    const fileRef = this.storageBooksRef.child(fileName);

    // Get the download URL
    fileRef
      .getDownloadURL()
      .then(url => {
        alert(url);
      })
      .catch(function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }
}
