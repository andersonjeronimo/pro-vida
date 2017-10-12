import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  percentage = 0;
  @ViewChild('fileInput') myFileInput: ElementRef;

  constructor(private service: FirebaseService) {}

  ngOnInit() {}

  onChange(event) {
    console.log(event.target.files);
    var _files: FileList = event.target.files;
    var file: File = _files[0];

    var storageRef = this.service.getStorageRef(file.name);

    var task = storageRef.put(file);

    task.on(
      'state_changed',
      snapshot => {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      error => {
        console.log(error);
      },
      complete => {
        alert('Envio Completo!');
      }
      /* function progress(snapshot) {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        alert('Envio completo!');
      } */
    );
  }
}
