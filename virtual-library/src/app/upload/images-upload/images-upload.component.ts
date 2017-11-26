/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.css']
})
export class ImagesUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Book } from '../../_models/book.model';
import { FirebaseService } from '../../_services/firebase.service';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.css']
})
export class ImagesUploadComponent implements OnInit {

  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('myForm') myForm;

  percentage = 0;
  uploading = false;
  private reference = 'books';
  file: File = null;
  private storageRef: any = null;
  private databaseChildRef: any = null;
  private task: any = null;

  book: Book = new Book(null, null, null, null, null, null);
  // criar model para artigo e imagem

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    this.storageRef = this.firebase.getStorageRef(this.reference);
    this.databaseChildRef = this.firebase.getDatabaseChildRef(this.reference);
  }

  onChange(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  clearForm() {
    if (this.file != null) {
      this.myForm.nativeElement.reset();
      this.file = null;
      this.percentage = 0;
    }
  }

  uploadFile() {
    if (this.file != null) {
      this.uploading = true;
      const storageFileRef = this.storageRef.child(this.file.name);
      console.log(storageFileRef);
      this.book.fileName = this.file.name;
      const task = storageFileRef.put(this.file);
      // acompanhar evolução do envio para o storage
      task.on(
        'state_changed',
        snapshot => {
          this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        },
        error => {
          console.log(error);
        },
        complete => {
          // gravar dados sobre o arquivo no database
          this.databaseChildRef.push(this.book);
          this.clearForm();
          alert('Envio Completo!');
          this.uploading = false;
        }
      );
    }
  }

}
