import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Request } from './request';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public APIURL: string = GlobalConstants.APIURL;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  reqs: Array<Request>;
  public addForm: FormGroup;
  reqId = new FormControl('', [ ]);
  submitted:boolean = false;
  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe( (response:any) => {
      console.log('info FETCHING', response);
      // this.posts = JSON.parse(response);
      // let str: string = JSON.stringify(response);
      // console.log(str)
      // str = str.replace(/[{}]/g, '');
      // console.log(str)
      // this.posts = JSON.parse(str)
      // JSON.parse(JSON.stringify(response)) as Array<Post>;
      let varia = JSON.parse(JSON.stringify(response));
      this.reqs = varia.Requests;
      // console.log('info FETCHED', this.reqs[0]);
    });
    this.addForm = new FormGroup({
      reqId: this.reqId
   });
  }

  setID(reqid) {
    console.log(reqid);
    this.addForm.setValue({reqId: reqid})
    this.reqId = reqid
  }

  acceptRequest(){
    this.submitted = true;
    this.addForm = this.formBuilder.group({
      reqId: this.reqId
    });
    if (this.addForm.valid) {
      console.log(this.addForm.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            alert(xhttp.status + xhttp.response); 
            window.location.reload();
        }
      }
      xhttp.open("PUT", GlobalConstants.APIURL+"requests/accept/"+this.addForm.controls['reqId'].value);//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      xhttp.send();
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  }

  declineRequest(){
    this.submitted = true;
    this.addForm = this.formBuilder.group({
      reqId: this.reqId
    });
    if (this.addForm.valid) {
      console.log(this.addForm.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            alert(xhttp.status + xhttp.response); 
            window.location.reload();
        }
      }
      xhttp.open("DELETE", GlobalConstants.APIURL+"requests/decline/"+this.addForm.controls['reqId'].value);//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      xhttp.send();
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  }

}
