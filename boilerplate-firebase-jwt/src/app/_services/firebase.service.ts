import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  private config = {
    apiKey: 'AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg',
    authDomain: 'biblioteca-pro-vida.firebaseapp.com',
    databaseURL: 'https://biblioteca-pro-vida.firebaseio.com',
    projectId: 'biblioteca-pro-vida',
    storageBucket: 'biblioteca-pro-vida.appspot.com',
    messagingSenderId: '4468655282'
  };
  _firebase: any;

  constructor() {
    firebase.initializeApp(this.config);
    this._firebase = firebase;
  }
}

