import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  private setting = {
    apiKey: 'AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg',
    authDomain: 'biblioteca-pro-vida.firebaseapp.com',
    databaseURL: 'https://biblioteca-pro-vida.firebaseio.com',
    projectId: 'biblioteca-pro-vida',
    storageBucket: 'biblioteca-pro-vida.appspot.com',
    messagingSenderId: '4468655282'
  };
  private provider: any = {};
  constructor() {
    firebase.initializeApp(this.setting);
  }
  // database
  getDatabaseRef(reference: string) {
    return firebase
      .database()
      .ref(reference);
  }

  getDatabaseChildRef(reference: string) {
    return firebase
      .database()
      .ref()
      .child(reference);
  }

  // storage
  getStorageRef(reference: string) {
    return firebase.storage().ref(reference);
  }

  // authentication
  // estas funções são responsáveis por utilizar os métodos de auth do firebase e de setarem
  // ... o usuário no LocalStorage / SessionStorage

  private saveCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  authWithFacebook() {
    this.provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(data => {
        // local storage (...)
        const user = data.user; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  authWithGoogle() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(data => {
        // local storage (...)
        const user = data.user; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  signOut() {
    firebase.auth().signOut();
    // remover usuário do local storage
    this.removeCurrentUser();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        // local storage (...)
        const user = data; // .json();
        if (user && user.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.saveCurrentUser(user);
        }
      });
      /* .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  /* authWithTwitter() {
    this.provider = new firebase.auth.TwitterAuthProvider();
    return this.signInWithProvider();
  }

  authWithGithub() {
    this.provider = new firebase.auth.GithubAuthProvider();
    return this.signInWithProvider();
  } */

}
