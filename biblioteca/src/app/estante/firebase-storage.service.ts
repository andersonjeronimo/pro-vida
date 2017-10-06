import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//firebase
//declare var firebase: any;

const DATABASE_URL_PREFIX = 'https://biblioteca-pro-vida.firebaseio.com/'; // URL to Firebase database API

@Injectable()
export class FirebaseStorageService {

  private config = {
    apiKey: "AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg",
    authDomain: "biblioteca-pro-vida.firebaseapp.com",
    databaseURL: "https://biblioteca-pro-vida.firebaseio.com",
    projectId: "biblioteca-pro-vida",
    storageBucket: "biblioteca-pro-vida.appspot.com",
    messagingSenderId: "4468655282"
  };

  constructor(private http: Http) {
    //firebase.initializeApp(this.config);
  }

  /* listBooks(): Observable<any[]> {
    return this.http.get(DATABASE_URL_PREFIX + "books.json")
      .map(this.extractData)
      .catch(this.handleError);    
  }  */

  createBook(book: any) {
    //return firebase.database().ref().child('books').push(book);
  }

  listBooks(): Observable<any> {
    return this.http.get(DATABASE_URL_PREFIX + "books.json")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBook(id: string): Observable<any> {
    return this.http.get(DATABASE_URL_PREFIX + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(DATABASE_URL_PREFIX + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* createBook(book: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(DATABASE_URL_PREFIX, book, options)
      .map(this.extractData)
      .catch(this.handleError);    
  } */

  private extractData(res: Response) {
    let data = res.json();
    return data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
