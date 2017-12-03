import { Component, EventEmitter, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FirebaseService } from '../../_services/firebase.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  fileList: any[] = [];
  private reference = 'books'; // hardcoded...modificar
  private databaseBooksRef: any = null;
  private storageBooksRef: any = null;
  loading = false;
  reading = false;
  filter: string;
  URL: SafeResourceUrl = null;

  // paginação
  numOfPages: number[] = [];
  currentPage = 1;
  pageSize = 5; // hardcoded...modificar
  private firstItemKey: string;
  private lastItemKey: string;
  childKey = 'title'; // orderByChild('childKey') hardcoded...modificar
  // END_OF paginação

  constructor(
    private service: FirebaseService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.databaseBooksRef = this.service.getDatabaseRef(this.reference);
    this.storageBooksRef = this.service.getStorageRef(this.reference);
    this.createRange();
    this.listFirstPage();
  }

  private createRange() {
    let numChildren: number;
    let pages: number;
    let hasLastPage = false;
    this.numOfPages = [];
    this.databaseBooksRef.once('value').then(snapshot => {
      numChildren = snapshot.numChildren();
      pages = numChildren / this.pageSize;
      hasLastPage = numChildren % this.pageSize === 0 ? false : true;
      pages += hasLastPage ? 1 : 0;
      for (let i = 1; i <= pages; i++) {
        this.numOfPages.push(i);
      }
    });
  }

  goToPage(targetPage: number) {
    if (targetPage !== this.currentPage) {
      if (targetPage < this.currentPage) {
        this.listPreviousPage();
      } else {
        this.listNextPage();
      }
      this.currentPage = targetPage;
    }
  }

  previousPage() {
    let targetPage: number;
    if (this.currentPage > 1) {
      targetPage = this.currentPage - 1;
      this.goToPage(targetPage);
    }
  }

  nextPage() {
    let targetPage: number;
    if (this.currentPage < this.numOfPages.length) {
      targetPage = this.currentPage + 1;
      this.goToPage(targetPage);
    }
  }

  listPreviousPage() {
    this.loading = true;
    this.databaseBooksRef
      .orderByChild(this.childKey)
      .endAt(this.firstItemKey)
      .limitToLast(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.fileList = [];
        snapshot.forEach(childSnapshot => {
          this.fileList.push(childSnapshot.val());
        });
        this.loading = false;
        this.fileList.pop(); // não há mais necessidade da referência
        this.firstItemKey = this.fileList[0][this.childKey];
        this.lastItemKey = this.fileList[this.fileList.length - 1][
          this.childKey
        ];
      });
  }

  listNextPage() {
    this.loading = true;
    this.databaseBooksRef
      .orderByChild(this.childKey)
      .startAt(this.lastItemKey)
      .limitToFirst(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.fileList = [];
        snapshot.forEach(childSnapshot => {
          this.fileList.push(childSnapshot.val());
        });
        this.loading = false;
        this.fileList.shift(); // não há mais necessidade da referência
        this.firstItemKey = this.fileList[0][this.childKey];
        this.lastItemKey = this.fileList[this.fileList.length - 1][
          this.childKey
        ];
      });
  }

  listFirstPage() {
    this.loading = true;
    this.databaseBooksRef
      .orderByChild(this.childKey)
      .limitToFirst(this.pageSize)
      .once('value')
      .then(snapshot => {
        this.fileList = [];
        snapshot.forEach(childSnapshot => {
          this.fileList.push(childSnapshot.val());
        });
        this.loading = false;
        this.firstItemKey = this.fileList[0][this.childKey];
        this.lastItemKey = this.fileList[this.fileList.length - 1][
          this.childKey
        ];
        this.currentPage = 1;
      });
  }

  listFiles() {
    this.loading = true;
    this.databaseBooksRef.once('value').then(snapshot => {
      this.fileList = [];
      snapshot.forEach(childSnapshot => {
        this.fileList.push(childSnapshot.val());
      });
      this.loading = false;
    });
    console.log(this.fileList);
  }

  filterFileList() {
    if (
      this.fileList.length === 0 ||
      this.filter === undefined ||
      this.filter.trim() === ''
    ) {
      return this.fileList;
    }
    return this.fileList.filter(file => {
      if (file.title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  closeFile() {
    this.reading = false;
    this.URL = false;
  }

  openFile(fileName: string) {
    // Create a reference to the file we want to download
    this.URL = null;
    this.reading = true;
    this.loading = true;
    const fileRef = this.storageBooksRef.child(fileName);

    // Get the download URL
    fileRef
      .getDownloadURL()
      .then(url => {
        this.URL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.openModal(template);
        this.loading = false;
      })
      .catch(function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            this.alertService.error(`File doesn't exist`);
            break;

          case 'storage/unauthorized':
            this.alertService.error(
              `User doesn't have permission to access the object`
            );
            break;

          case 'storage/canceled':
            this.alertService.error(`User canceled the upload`);
            break;

          case 'storage/unknown':
            this.alertService.error(
              `Unknown error occurred, inspect the server response`
            );
            break;
        }
      });
  }
}
