import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: FirebaseService) { }

  ngOnInit() {
  }

  authWithGoogle() {
    this.service.authWithGoogle();
  }

  signOut() {
    this.service.signOut();
  }

}
