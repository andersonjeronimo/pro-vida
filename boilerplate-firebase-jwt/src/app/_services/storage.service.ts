import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor(private service: FirebaseService) { }

  getStorageRef(reference: string) {
    return this.service._firebase.storage.ref(reference);
  }

}
