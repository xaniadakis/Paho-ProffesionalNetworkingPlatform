import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JWT } from './jwt';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { jwt } from './welcome/welcome.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConstants } from './common/global-constants';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthenticationService {
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router, 
      // public jwtHelper: JwtHelperService
      ) {
    }

    cors_proxy = "http://localhost:3010";
    url = GlobalConstants.APIURL+"startpage/post/getallposts";

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

    login(email:string, password:string ) {
      
      const headerDict = {
          "Target-URL": this.url,
          "Content-Type": "application/json;charset=UTF-8",
          // 'Access-Control-Allow-Headers': 'Content-Type',
      }
          
      const requestOptions = {
        headers: headerDict, 
      };

      const json = {
        "email": email,
        "password": password
      };
      console.log("response2");

      return this.http.post<JWT>(this.cors_proxy, JSON.stringify(json), requestOptions).pipe(
        catchError(this.handleError)
      ); 
      
    }

    isAuthenticated(): boolean{
      const token = sessionStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

}