import { fileExists } from 'ts-node/dist';
import { EventEmitter, Injectable } from '@angular/core';

/* firebase */
declare var firebase: any;

@Injectable()
export class FirebaseService {
  private provider: any;
  private userAuthenticated = false;

  private user: any = {
    accessToken: null,
    refreshToken: null,
    uid: null,
    displayName: null,
    email: null,
    photoURL: null
  };

  authEmitter: EventEmitter<any> = new EventEmitter();

  private config = {
    apiKey: 'AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg',
    authDomain: 'biblioteca-pro-vida.firebaseapp.com',
    databaseURL: 'https://biblioteca-pro-vida.firebaseio.com',
    projectId: 'biblioteca-pro-vida',
    storageBucket: 'biblioteca-pro-vida.appspot.com',
    messagingSenderId: '4468655282'
  };

  constructor() {
    firebase.initializeApp(this.config);
  }

  isUserAuthenticated() {
    return this.userAuthenticated;
  }

  getStorageRef(reference: string) {
    return firebase.storage().ref(reference);
  }

  getDatabaseRef(reference: string) {
    return firebase.database().ref(reference).orderByKey();
  }

  setDatabaseRefData(reference: string, data: any) {
    return firebase.database().ref().child(reference).push(data);
  }

  authWithGoogle() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(result => {
        console.log(result);
        this.userAuthenticated = true;
        this.user = {
          accessToken: result.credential.accessToken,
          refreshToken: result.refreshToken,
          uid: result.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        };
        this.authEmitter.emit(this.user);
      })
      .catch(error => {
        alert(`${error.code} : ${error.message}`);
      });
  }

  signOut() {
    firebase.auth().signOut();
    this.user = {
      accessToken: null,
      refreshToken: null,
      uid: null,
      displayName: null,
      email: null
    };
    this.authEmitter.emit(this.user);
    this.userAuthenticated = false;
  }

  /* createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  } */

  /* authWithTwitter() {
    this.provider = new firebase.auth.TwitterAuthProvider();
    return this.signInWithProvider();
  }

  authWithFacebook() {
    this.provider = new firebase.auth.FacebookAuthProvider();
    return this.signInWithProvider();
  }

  authWithGithub() {
    this.provider = new firebase.auth.GithubAuthProvider();
    return this.signInWithProvider();
  } */

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
