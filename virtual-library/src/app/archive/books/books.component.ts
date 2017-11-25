import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';

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
  filter: string;
  URL: SafeResourceUrl = null;

  // paginação
  numOfPages: number[] = [];
  currentPage: number = 1;
  pageSize: number = 3; // hardcoded...modificar
  private firstItemKey: string;
  private lastItemKey: string;
  childKey: string = 'title'; // orderByChild('childKey') hardcoded...modificar
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
    let hasLastPage: boolean = false;
    this.numOfPages = [];
    this.databaseBooksRef.once('value').then(snapshot => {
      numChildren = snapshot.numChildren();
      pages = numChildren / this.pageSize;
      for (let i = 1; i <= pages; i++) {
        this.numOfPages.push(i);
      }

      hasLastPage = numChildren % this.pageSize > 0 ? true : false;
      if (hasLastPage) {
        this.numOfPages.push(this.numOfPages.length);
      }

    });
  }

  // TO DO...
  goToPage(page: number) {
    this.currentPage = page;
    // trabalhar com os valores firstItemKey e lastItemKey...
    // ...e com os métodos do firebase
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.goToPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.numOfPages.length) {
      this.currentPage += 1;
      this.goToPage(this.currentPage);
    }
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
        this.lastItemKey = this.fileList[this.fileList.length - 1][this.childKey];
        this.currentPage = 1;
      });

    /*
  1ª pág.:
  ---------------------
  var currentPage = 1
  var pageSize = 3 (exemplo)
  var [f]irstItem;
  var [l]astItem;

  .orderByChild('title')
  .limitToFirst(pageSize); (3)

  [f]---[l]
  [a, b, c, d, e, f, g]

  firstItem = a.title;
  lastItem = c.title;

  2ª pág. em diante (avançando página >>):
  ---------------------
  var pageSize = 3 (exemplo)
  var [f]irstItem;
  var [l]astItem;

  .orderByChild('title')
  .startAt( lastItem* ) *título do ÚLTIMO livro da página atual
  .limitToFirst(pageSize);

        [f]---[l]
  [a, b, c, d, e, f, g]

  firstItem = lastItem;
  lastItem = e.title;
  currentPage += 1;

  2ª pág. em diante (voltando página <<):
  ---------------------
  var pageSize = 3 (exemplo)
  var [f]irstItem;
  var [l]astItem;

  .orderByChild('title')
  .endAt( firstItem* ) *título do PRIMEIRO livro da página atual
  .limitToLast(pageSize);

  [f]---[l]
  [a, b, c, d, e, f, g]

  lastItem = firstItem;
  firstItem = a.title;

  */
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

  openFile(fileName: string, template: TemplateRef<any>) {
    // Create a reference to the file we want to download
    this.URL = null;
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
