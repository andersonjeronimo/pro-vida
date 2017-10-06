import { Component, OnInit } from '@angular/core';

import { FirebaseAuthService } from './firebase-auth.service';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {

  email: string = "";
  password: string = "";
  message: string = "Você não está autenticado.";

  constructor(private service: FirebaseAuthService) { }

  ngOnInit() {
  }

  createUserWithEmailAndPassword() {
    this.service
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(function () {
        this.message = "Usuário cadastrado com sucesso.";
        this.email = "";
        this.password = "";
      })
      .catch(
      error => this.message = error.code + " : " + error.message
      );
  }

  signInWithEmailAndPassword(){
    this.service
    .signInWithEmailAndPassword(this.email, this.password)
    .then(function () {
      this.message = "Login efetuado com sucesso.";
      this.email = "";
      this.password = "";
    })
    .catch(
      error => this.message = error.code + " : " + error.message
    );
  }

  authWithTwitter(){
    this.service
    .authWithTwitter();
    /* .then()
    .catch();     */
  }

  authWithFacebook(){
    this.service
    .authWithFacebook();
    /* .then()
    .catch(); */
  }

  authWithGithub(){
    this.service
    .authWithGithub();
    /* .then()
    .catch();     */
  }

  authWithGoogle(){
    this.service
    .authWithGoogle();
    /* .then()
    .catch(); */
  }

  signOut(){
    this.service
    .signOut()
    .then(function () {
      this.message = "Logout efetuado com sucesso.";
    })
    .catch(
      error => this.message = error.code + " : " + error.message
    );
  }

}