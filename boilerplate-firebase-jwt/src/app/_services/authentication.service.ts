import { FirebaseService } from "./firebase.service";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private provider: any = null;

  constructor(private service: FirebaseService) {}

  // esta classe será responsável por utilizar os métodos de auth do firebase e de setar
  // ... o usuário no LocalStorage
  authWithFacebook() {
    this.provider = new this.service._firebase.auth.FacebookAuthProvider();
    return this.service._firebase
      .auth()
      .signInWithPopup(this.provider);
      /* .then(result => {
        console.log(result);
        // local storage (...)
        let user = result.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // criar diretiva de alertas
      }); */
  }

  authWithGoogle() {
    this.provider = new this.service._firebase.auth.GoogleAuthProvider();
    return this.service._firebase
      .auth()
      .signInWithPopup(this.provider);
      /* .then(result => {
        console.log(result);
        // local storage (...)
        let user = result.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  signOut() {
    this.service._firebase.auth().signOut();
    // remover usuário do local storage
    localStorage.removeItem('currentUser');
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    // return this.service._firebase.auth().createUserWithEmailAndPassword(email, password);
    return this.service._firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
      /* .then(result => {
        let user = result.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(error => {
        alert(`${error.code} : ${error.message}`);
        // utilizar diretiva de alertas
      }); */
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.service._firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      /* .then(result => {
        let user = result.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(error => {
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
