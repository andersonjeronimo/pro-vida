import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FirebaseService } from '../firebase.service';
import { Book } from '../entity/book';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('myForm') myForm;

  percentage = 0;
  private reference = 'books';
  private file: File = null;
  // private files: FileList = null;
  private storageRef: any = null;
  private task: any = null;

  book: Book = new Book(null, null, null, null, null, null);

  constructor(private service: FirebaseService) {}

  ngOnInit() {}

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
      const storageRef = this.service.getStorageRef(this.file.name, this.reference);
      console.log(storageRef);
      this.book.fileName = this.file.name;
      const task = storageRef.put(this.file);
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
          this.service.setDatabaseRefData(this.reference, this.book);
          this.clearForm();
          alert('Envio Completo!');
        }
      );
    }
  }

}
