import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Book } from '../_models/book';
import { FirebaseService } from './../_services/index';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('myForm') myForm;

  percentage = 0;
  uploading = false;
  private reference = 'books';
  private file: File = null;
  private storageRef: any = null;
  private databaseChildRef: any = null;
  private task: any = null;

  book: Book = new Book(null, null, null, null, null, null);

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

