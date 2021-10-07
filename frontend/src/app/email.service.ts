import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//send email in angular 6 EmailService
@Injectable()
export class EmailService {

  constructor(private http:  HttpClient) { }

  sendEmail(argparam) {
    return this.http.post('httpspakainfo.com/email/', argparam)
  }

}