import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth.service'
import { JWT, response } from '../jwt';
export { jwt };
import { decodedjwt } from '../decodedjwt';


declare function myFunction(): any;
declare function greet(): any;

var jwt;
var res: response;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

//   constructor() { 
//   }

//   ngOnInit()  {
//     greet();
//   }

// }
  public loginForm: FormGroup;
  email = new FormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(4),
    // Validators.maxLength(20)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  public submitted = false;
  decjwt: decodedjwt;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthenticationService) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }
  
  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    sessionStorage.clear();
    // if (this.loginForm.valid) {
      console.log("logging in",this.loginForm.value);
      var formData = new FormData();
      formData.append("email", this.loginForm.controls['email'].value);
      formData.append("password", this.loginForm.controls['password'].value); 
      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      var Decjwt = this.decjwt
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            // alert(xhttp.response);
            // alert(JSON.parse(sessionStorage.getItem("token")))
            if(xhttp.status != 200){
              alert("Wrong email/password");
              Router.navigateByUrl('/app/welcome'); 
            }
            console.log(xhttp.response);
            res = JSON.parse(xhttp.response) 
            jwt = res.token
            sessionStorage.setItem('token',jwt);
            Decjwt = JSON.parse(JSON.stringify(dec_token(jwt)));
            sessionStorage.setItem('userid',Decjwt.userID);
            sessionStorage.setItem('name',Decjwt.name);

            console.log("loggedin",sessionStorage.getItem('name'));

            // alert(res.token);
            // alert(JSON.stringify(res));
            if(xhttp.status == 200)
              Router.navigateByUrl('/app/loggedin/start'); 
        }
      }
      xhttp.open("POST", "http://localhost:3000/user/login");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/user/login");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      const json = {
        "email": this.loginForm.controls['email'].value,
        "password": this.loginForm.controls['password'].value
      };

      xhttp.send(JSON.stringify(json));
    // }
  }

  // onLogin() {
  //   this.submitted = true;
  //   const val = this.loginForm.value;
  //   var Router = this.router;
  //   console.log("response");
  //   if (this.loginForm.valid) {
  //     console.log("response1");

  //       this.auth.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
  //           .subscribe(response => {
  //                   jwt = response;
  //                   console.log("nibba",response);
  //                   Router.navigateByUrl('/app/loggedin/start');
  //               }
  //           );
  //   }
  // }

}
  function dec_token(token) {
    const decodedtoken = (token) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token.split('.')
      .map(token => decodedtoken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }



// // export class FileUploadComponent implements OnInit {
//   form: FormGroup;

//   constructor(private readonly fb: FormBuilder) {
//     this.form = this.fb.group({
//       username: [],      
//       password: []
//     });
//   }


//   ngOnInit()  {
//     greet();
//   }

//   uploadFile(event: any) {
//     const file = (event.target as HTMLInputElement).files[0];
//     this.form.patchValue({
//       avatar: file
//     });
//     this?.form?.get('avatar')?.updateValueAndValidity()
//   }

//   // submitForm() {
//   //   console.log(this.form.value)
//   // }
//   submitForm() {
//     console.log(this.form.getRawValue());
//   }

// }


