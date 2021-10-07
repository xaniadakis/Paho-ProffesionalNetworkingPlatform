import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JWT } from '../jwt';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";
import { jwt } from './welcome.component'
import { GlobalConstants } from '../common/global-constants';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class JWTSender {
     
    constructor(private http: HttpClient) {
    }

    cors_proxy = "http://localhost:3010";
    url = GlobalConstants.APIURL+"startpage/";

    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('ERROR:', error.error);
      } else {
        console.error(
          `ERROR STATUS: ${error.status}, ERROR BODY: `, error.error);
      }
      return throwError(
        'ERROR occured.');
    }

    sendJwt() {
      
      const headerDict = {
          // "Target-URL": this.url,
          "Content-Type": "application/json;charset=UTF-8",
          // 'Access-Control-Allow-Headers': 'Content-Type',
      }
          
      const requestOptions = {
        headers: headerDict, 
      };

      const json = {
        "token": jwt,
      };

      return this.http.post(this.cors_proxy, JSON.stringify(json), requestOptions).pipe(
        catchError(this.handleError)
      ); 
      
    }
}