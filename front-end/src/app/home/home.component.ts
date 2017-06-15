import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { FilesService } from './files.service';
import { File } from './entity/file';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private errorMessage: string;
  private files: File[];
  private file: File;

  mode = 'Observable';

  constructor(private service: FilesService) { }

  ngOnInit() {
    //this.getFiles();
  }

  getFiles() {
    this.service.getFiles()
      .subscribe(
      files => this.files = files,
      error => this.errorMessage = <any>error);
  }

  getFileById(id: number) {
    this.service.getFileById(id)
      .subscribe(
      file => this.file = file,
      error => this.errorMessage = <any>error);
  }

}
