import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

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
  auth: Subscription = null;
  user: string = "nulo";
  // modal
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.auth = this.service.authEmitter.subscribe(
      auth => {
        this.auth = auth;
        this.user = auth.user.displayName;
      }
    );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.auth.unsubscribe();
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
}
