import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, FirebaseService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        // private userService: UserService,
        private authService: FirebaseService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.authService.createUserWithEmailAndPassword(this.model.email, this.model.password)
        .then(
          result => {
            console.log(result);
            this.alertService.success('Cadastro efetuado com sucesso', true);
            this.router.navigate(['/login']);
          }
        ).catch(
          error => {
            this.alertService.error(error);
            this.loading = false;
        }
        );

        /* this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }); */
    }
}

