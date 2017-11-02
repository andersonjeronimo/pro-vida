import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
// import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser: any = {};
  // users: User[] = [];
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.router.navigate(['/home-content']);
  }

  /* deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  } */
}
