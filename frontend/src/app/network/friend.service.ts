import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
import { Friend } from './friend';
import { jwt } from '../welcome/welcome.component'


@Injectable({
  providedIn: 'root'
})
export class FriendService {
    cors_proxy = "http://localhost:3010";
    url = "http://localhost:3000/network/"+sessionStorage.getItem('userid');
    constructor(public http: HttpClient) {}
    
    getFriends(): Observable<Array<Friend>> {

        const headerDict = {
            // "Target-URL": this.url,
            "Content-Type": "application/json;charset=UTF-8",
            // 'Access-Control-Allow-Headers': 'Content-Type',
        }
        const requestOptions = {                                                                                                                                                                                 
            headers: headerDict, 
        };
        console.log("WILL get friends!")
        return this.http.get<Array<Friend>>(this.url, requestOptions)
    }
}
       