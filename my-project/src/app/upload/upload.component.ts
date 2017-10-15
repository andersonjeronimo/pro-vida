import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput') myFileInput: ElementRef;

  percentage = 0;
  private reference = 'books';
  private file: File = null;
  private files: FileList = null;
  private storageRef: any = null;
  private task: any = null;

  constructor(private service: FirebaseService) {}

  ngOnInit() {}

  onChange(event) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const storageRef = this.service.getStorageRef(file.name, this.reference);
    const task = storageRef.put(file);
    // acompanhar evolução do envio
    task.on(
      'state_changed',
      snapshot => {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      error => {
        console.log(error);
      },
      complete => {
        var book = {

        };
        this.service.setDatabaseRefData(this.reference, storageRef);
        alert('Envio Completo!');
      }
    );
  }

}
