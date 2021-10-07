import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
import { Post } from './post';
import { jwt } from '../welcome/welcome.component'
import { GlobalConstants } from '../common/global-constants';


@Injectable({
  providedIn: 'root'
})
export class PostService {
    cors_proxy = "http://localhost:3010";
    url = GlobalConstants.APIURL+"startpage/post/getallposts";
    constructor(public http: HttpClient) {}
    
    getPosts(): Observable<Array<Post>> {

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
        console.log("WILL get posts!")
        return this.http.get<Array<Post>>(this.url, requestOptions)
    }
}
       