import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
  email = '';
  password = '';
  message = 'Você não está autenticado';
  result: any = null;
  photoURL = '';

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.service.authEmitter.subscribe(
      //verificar modificações
    );
  }

  createUserWithEmailAndPassword() {
    this.service
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  signInWithEmailAndPassword() {
    this.service
      .signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  authWithTwitter() {
    this.service
      .authWithTwitter()
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  authWithFacebook() {
    this.service
      .authWithFacebook()
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  authWithGithub() {
    this.service
      .authWithGithub()
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  authWithGoogle() {
    this.service
      .authWithGoogle()
      .then(result => {
        this.signInSuccess(result);
      })
      .catch(error => {
        this.signInError(error);
      });
  }

  signInSuccess(result: any) {
    console.log(result);
    this.message = `Usuário ${result.email} autenticado com sucesso`;
    this.email = '';
    this.password = '';
    this.service.authEmitter.emit(result);
  }

  signInError(error: any) {
    this.message = `${error.code} : ${error.message}`;
  }

  signOut() {
    this.service
      .signOut()
      .then(
        (this.message = 'Logout efetuado com sucesso'),
        (this.result = null)
      )
      .catch(error => alert(error.code + ' : ' + error.message));
  }
}
