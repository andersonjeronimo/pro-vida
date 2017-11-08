/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

} */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: FirebaseService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.signOut();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService
      .signInWithEmailAndPassword(this.model.email, this.model.password)
      .then(data => {
        // this.alertService.success('Login efetuado com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }

  authWithGoogle() {
    this.loading = true;
    this.authenticationService
      .authWithGoogle()
      .then(data => {
        // this.alertService.success('Autenticação com Google efetuada com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }

  authWithFacebook() {
    this.loading = true;
    this.authenticationService
      .authWithFacebook()
      .then(data => {
        // this.alertService.success('Autenticação com Facebook efetuada com sucesso', true);
        // this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }
}
