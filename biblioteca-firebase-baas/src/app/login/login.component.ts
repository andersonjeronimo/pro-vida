import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  authUser: any = {
    accessToken: null,
    refreshToken: null,
    uid: null,
    displayName: null,
    email: null,
    photoURL: null
  };

  private subscription: any;

  constructor(private service: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.service.authEmitter.subscribe(
      result => (this.authUser = result)
    );
  }

  authWithGoogle() {
    this.service.authWithGoogle();
  }

  authWithFacebook() {
    this.service.authWithFacebook();
  }

  signOut() {
    this.router.navigate(['/login']);
    this.service.signOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
