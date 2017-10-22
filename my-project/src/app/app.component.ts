import { FirebaseService } from './firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private user: any = {
    accessToken: null,
    refreshToken: null,
    uid: null,
    displayName: null,
    email: null,
    photoURL: null
  };

  constructor(private service: FirebaseService) {}

  ngOnInit(): void {
    this.service.authEmitter.subscribe(
      user => this.user = user
    );
  }

  authWithGoogle() {
    this.service.authWithGoogle();
  }

  signOut() {
    this.service.signOut();
  }
}
