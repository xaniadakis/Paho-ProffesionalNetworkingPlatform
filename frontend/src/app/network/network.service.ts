import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
import { User } from './network';
import { jwt } from '../welcome/welcome.component'
import { GlobalConstants } from '../common/global-constants';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
    cors_proxy = "http://localhost:3010";
    url = GlobalConstants.APIURL+"network";
    constructor(public http: HttpClient) {}
    
    getAll(): Observable<Array<User>> {

        const headerDict = {
            // "Target-URL": this.url,
            "Content-Type": "application/json;charset=UTF-8",
            // 'Access-Control-Allow-Headers': 'Content-Type',
        }
        const requestOptions = {                                                                                                                                                                                 
            headers: headerDict, 
        };
        console.log("WILL get all!")
        return this.http.get<Array<User>>(this.url, requestOptions)
    }
}
      