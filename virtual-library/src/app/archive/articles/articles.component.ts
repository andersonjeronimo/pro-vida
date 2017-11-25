/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */

import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FirebaseService } from '../../_services/firebase.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  fileList: any[] = [];
  private reference = 'articles';
  private databaseBooksRef: any = null;
  private storageBooksRef: any = null;
  loading = false;
  filter: string;
  URL: SafeResourceUrl = null;

  constructor(
    private service: FirebaseService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.databaseBooksRef = this.service.getDatabaseRef(this.reference);
    this.storageBooksRef = this.service.getStorageRef(this.reference);
    // this.listFiles();
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
    if (this.fileList.length === 0 || this.filter === undefined || this.filter.trim() === '' ) {
      return this.fileList;
    }
    return this.fileList.filter(
      (file) => {
        if (file.title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 ) {
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
