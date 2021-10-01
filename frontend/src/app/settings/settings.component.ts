import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  public newMail: FormGroup;
  email = new FormControl('', [ ]);
  public newPassword: FormGroup;
  password = new FormControl('', [
    Validators.minLength(4),
  ]);
  UserId = localStorage.getItem("userid")
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.newMail = this.formBuilder.group({
      email: this.email,
      UserId: this.UserId
    });
    this.newPassword = this.formBuilder.group({
      password: this.password,
      UserId: this.UserId
    });
  }


  changeMail(): any {
    this.submitted = true;
    if (this.newMail.valid) {
      console.log(this.newMail.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("PATCH", "http://localhost:3000/settings/mail");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      const json = {
        "UserId": localStorage.getItem('userid'),
        "email": this.newMail.controls['email'].value,
        "token": localStorage.getItem('token')
      };

      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  }

  changePassword(): any {
    this.submitted = true;
    if (this.newPassword.valid) {
      console.log(this.newPassword.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("PATCH", "http://localhost:3000/settings/password");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/password");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      const json = {
        "UserId": localStorage.getItem('userid'),
        "password": this.newPassword.controls['password'].value,
        "token": localStorage.getItem('token')
      };

      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  }

}
