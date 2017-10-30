import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService {
  constructor(private service: FirebaseService) {}

  getDatabaseRef(reference: string) {
    return this.service._firebase
      .database()
      .ref(reference)
      .orderByKey();
  }

  getDatabaseChildRef(reference: string) {
    return this.service._firebase
      .database()
      .ref()
      .child(reference);
  }
}
