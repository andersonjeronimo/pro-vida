import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  // email = "";
  // password = "";
  message = 'Autenticar com uma das contas abaixo';

  constructor(private service: FirebaseService, private router: Router) {}

  ngOnInit() { }

  /* createUserWithEmailAndPassword() {
    this.service
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(result => this.signInSuccess(result))
      .catch(error => this.signInError(error));
  }

  signInWithEmailAndPassword() {
    this.service
      .signInWithEmailAndPassword(this.email, this.password)
      .then(result => this.signInSuccess(result))
      .catch(error => this.signInError(error));
  } */

  authWithTwitter() {
    this.service
      .authWithTwitter()
      .then(
        result => {
          console.log(result);
          this.service.authEmitter.emit(result);
          this.router.navigate(['/home']);
        }
      )
      .catch(
        error => this.message = `${error.code} : ${error.message}`
      );
  }

  authWithFacebook() {
    this.service
      .authWithFacebook()
      .then(
        result => {
          console.log(result);
          this.service.authEmitter.emit(result);
          this.router.navigate(['/home']);
        }
      )
      .catch(
        error => this.message = `${error.code} : ${error.message}`
      );
  }

  authWithGithub() {
    this.service
      .authWithGithub()
      .then(
        result => {
          console.log(result);
          this.service.authEmitter.emit(result);
          this.router.navigate(['/home']);
        }
      )
      .catch(
        error => this.message = `${error.code} : ${error.message}`
      );
  }

  authWithGoogle() {
    this.service
      .authWithGoogle()
      .then(
        result => {
          console.log(result);
          this.service.authEmitter.emit(result);
          this.router.navigate(['/home']);
        }
      )
      .catch(
        error => this.message = `${error.code} : ${error.message}`
      );
  }

  signOut() {
    this.service
      .signOut()
      .then(
        this.message = 'Logout efetuado com sucesso'
      )
      .catch(error => alert(`${error.code} : ${error.message}`));
  }
}
