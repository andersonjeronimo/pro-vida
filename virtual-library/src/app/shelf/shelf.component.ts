/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */
import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FirebaseService } from '../_services/firebase.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {
  fileList: any[] = [];
  private reference = 'books';
  private databaseBooksRef: any = null;
  private storageBooksRef: any = null;

  loading = false;

  URL: SafeResourceUrl = null;

  // modal
  // public modalRef: BsModalRef;

  constructor(
    private service: FirebaseService,
    private sanitizer: DomSanitizer,
    // private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.databaseBooksRef = this.service.getDatabaseRef(this.reference);
    this.storageBooksRef = this.service.getStorageRef(this.reference);
    // this.listFiles();
  }

  private openModal(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(template);
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

  /* fileURL() {
    if (this.URL !== "") {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.URL);
    }
  } */

  openFile(fileName: string, template: TemplateRef<any>) {
    // Create a reference to the file we want to download
    this.loading = true;
    const fileRef = this.storageBooksRef.child(fileName);

    // Get the download URL
    fileRef
      .getDownloadURL()
      .then(url => {
        this.URL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.openModal(template);
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

