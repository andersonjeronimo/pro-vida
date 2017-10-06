import { Injectable } from '@angular/core';
/* import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'; */

//firebase
declare var firebase: any;

@Injectable()
export class FirebaseAuthService {

  private config = {
    apiKey: "AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg",
    authDomain: "biblioteca-pro-vida.firebaseapp.com",
    databaseURL: "https://biblioteca-pro-vida.firebaseio.com",
    projectId: "biblioteca-pro-vida",
    storageBucket: "biblioteca-pro-vida.appspot.com",
    messagingSenderId: "4468655282"
  };

  private provider: any; 

  constructor() {
    firebase.initializeApp(this.config);    
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  authWithTwitter(){
    this.provider = new firebase.auth.TwitterAuthProvider();
    this.signInWithProvider();
  }

  authWithFacebook(){
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.signInWithProvider();
  }

  authWithGithub(){
    this.provider = new firebase.auth.GithubAuthProvider();
    this.signInWithProvider();
  }

  authWithGoogle(){
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.signInWithProvider();
  }

  signInWithProvider(){
    firebase.auth().signInWithPopup(this.provider);
  }

  signOut(){
    return firebase.auth().signOut();
  }

  /* private extractData(res: Response) {
    let data = res.json();
    return data || {};
  } */

  /* private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  } */

}










