import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { GlobalConstants } from '../common/global-constants';
import { Inject }  from '@angular/core';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  public Form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
    });
  }

  onLogout(){
    var xhttp = new XMLHttpRequest();
    var Router = this.router;
    xhttp.open("PATCH", GlobalConstants.APIURL+"user/logout/"+sessionStorage.getItem('userid'));
    // alert("logging!")
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        // alert("out!")
        if(xhttp.status==200){
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userid');
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('name');
          sessionStorage.clear();
          Router.navigateByUrl('/app/welcome');
          alert("You are logged out!")
        }
      }
    }
    xhttp.send();
    // alert("logging out!")
  }

}
