import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
import { Request } from './request';
import { jwt } from '../welcome/welcome.component'


@Injectable({
  providedIn: 'root'
})
export class RequestService {
    cors_proxy = "http://localhost:3010";
    url = "http://localhost:3000/requests/getreqs/"+localStorage.getItem('userid');
    constructor(public http: HttpClient) {}
    
    getRequests(): Observable<Array<Request>> {

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
        console.log("WILL get all requests!")
        return this.http.get<Array<Request>>(this.url, requestOptions)
    }
}
       