import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from './firebase-auth.service';

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

  constructor(private service: FirebaseAuthService) { }

  ngOnInit() {
  }

  createUserWithEmailAndPassword() {
    this.service
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(
        result => {
          this.message = `Usuário ${result.email} cadastrado com sucesso`;
          this.email = '';
          this.password = '';
        }
      )
      .catch(
      error => this.message = `${error.code} : ${error.message}`
      );
  }

  signInWithEmailAndPassword() {
    this.service
      .signInWithEmailAndPassword(this.email, this.password)
      .then(
        result => {
        console.log(result);
        this.message = `Benvindo ${result.email} !`;
        this.email = '';
        this.password = '';
      })
      .catch(
      error => this.message = error.code + ' : ' + error.message
      );
  }

  authWithTwitter() {
    this.service
      .authWithTwitter()
      .then(
      result => this.result = result
      )
      .catch(
      error => this.message = error.code + ' : ' + error.message
      );
  }

  authWithFacebook() {
    this.service
      .authWithFacebook()
      .then(
      result => this.result = result
      )
      .catch(
      error => this.message = error.code + ' : ' + error.message
      );
  }

  authWithGithub() {
    this.service
      .authWithGithub()
      .then(
      result => this.result = result
      )
      .catch(
      error => this.message = error.code + ' : ' + error.message
      );
  }

  authWithGoogle() {
    this.service
      .authWithGoogle()
      .then(
      result => this.result = result
      )
      .catch(
      error => this.message = error.code + ' : ' + error.message
      );
  }

  signOut() {
    this.service
      .signOut()
      .then(
      this.message = 'Logout efetuado com sucesso',
      this.result = null
      )
      .catch(
      error => alert(error.code + ' : ' + error.message)
      );
  }

}