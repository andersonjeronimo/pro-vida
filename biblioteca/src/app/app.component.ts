import { Component, EventEmitter, OnInit } from '@angular/core';

import { FirebaseService } from './firebase.service';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biblioteca Virtual';
  // auth
  auth: any = null;
  // modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.service.authEmitter.subscribe(
      auth => {
        this.auth = auth;
      }
    );
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
}
