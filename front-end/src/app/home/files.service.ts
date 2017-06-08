import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { File } from './entity/file';

@Injectable()
export class FilesService {

  private filesUrl = 'http://localhost:3000/api/files';  // URL to web API
  
  constructor(private http: Http) { }
  
  getDriveFiles(): Observable<File[]> {
    return this.http.get(this.filesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDriveFileById(id: number): Observable<File> {    
    console.log(this.filesUrl + '/' + id);
    return this.http.get(this.filesUrl + '/' + id)
      .map(this.extractData2)
      .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body;//.data || {};
  }

  private extractData2(res: Response) {
    let body = res.json();
    return body.data || {};
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
