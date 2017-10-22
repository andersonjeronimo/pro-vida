import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  authWithGoogle() {
    this.service.authWithGoogle();
  }

  signOut() {
    this.router.navigate(['/login']);
    this.service.signOut();
  }

}
