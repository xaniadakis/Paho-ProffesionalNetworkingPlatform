import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
import { User } from './user';
import { jwt } from '../welcome/welcome.component'


@Injectable({
  providedIn: 'root'
})
export class InfoService {
    // cors_proxy = "http://localhost:3010";
    url = "http://localhost:3000/personalInfo/"+localStorage.getItem("userid");
    constructor(public http: HttpClient) {}
    
    getInfo(): Observable<User> {

        // var xhttp = new XMLHttpRequest();
        // xhttp.open("GET", this.cors_proxy);
        // xhttp.setRequestHeader("Target-URL", this.url);
        // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhttp.send(null);
        // xhttp.onreadystatechange = () => {
        //     if (xhttp.readyState == XMLHttpRequest.DONE) {
        //         return xhttp.response;
        //     }
        // }
        // return xhttp.response;

        const headerDict = {
            // "Target-URL": this.url,
            "Content-Type": "application/json;charset=UTF-8",
            // 'Access-Control-Allow-Headers': 'Content-Type',
        }
        const requestOptions = {                                                                                                                                                                                 
            headers: headerDict, 
        };
        console.log("WILL get info for ",localStorage.getItem("name"),localStorage.getItem("userid"))
        return this.http.get<User>(this.url, requestOptions)
    }
}
       