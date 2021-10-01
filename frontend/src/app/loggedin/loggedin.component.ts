import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

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
    xhttp.open("PATCH", "http://localhost:3000/user/logout/"+localStorage.getItem('userid'));
    // alert("logging!")
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        // alert("out!")
        if(xhttp.status==200){
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.clear();
          Router.navigateByUrl('/app/welcome');
          alert("You are logged out!")
        }
      }
    }
    xhttp.send();
    // alert("logging out!")
  }
}
