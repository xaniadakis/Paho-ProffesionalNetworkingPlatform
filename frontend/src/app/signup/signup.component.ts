import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { JWT, response } from '../jwt';
import { decodedjwt } from '../decodedjwt';

var res: response;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
    public file: any;
    public signupForm: FormGroup;
    // firstname = new FormControl('', [
    //   Validators.required,
    // ]);
    name = new FormControl('');
    // lastname = new FormControl('', [
    //   Validators.required,
    // ]);
    surname = new FormControl('');
    // telephone = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(10),
    //   Validators.maxLength(10)
    // ]);
    telephone = new FormControl('');
    education = new FormControl('');
    job_description = new FormControl('');
    // email = new FormControl('', [
    //   Validators.email,
    //   Validators.required,
    //   Validators.minLength(4),
    //   Validators.maxLength(20)
    // ]);
    email = new FormControl('');
    // password = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    // ]);
    // password_verification = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    // ]);
    user_Image = new FormControl('');
    password1 = new FormControl('');
    password2 = new FormControl('');
    age = new FormControl('');
    public submitted = false;
    decjwt: decodedjwt;

    constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }
  
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name: this.name,
        surname: this.surname,
        telephone: this.telephone,
        education: this.education,
        job_description: this.job_description,
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        age: this.age,
        user_Image: this.user_Image
      });
    }
    
    get formControl() {
      return this.signupForm.controls;
    }

     onFileChanged(event: any): void {
      var file = event.target.files[0];
      this.signupForm.controls['user_Image'].setValue(file)
    }
  

    onSignup(): void {
      this.submitted = true;
      if (this.signupForm.valid) {
        console.log(this.signupForm.value);
        // sessionStorage.setItem("user-Data", JSON.stringify(this.signupForm.value));
        // this.http.post('http://localhost:3000/user/signup', sessionStorage).subscribe(
        //   (response) => console.log(response),
        //   (error) => console.log(error)
        // )

        var formData = new FormData();
  
        formData.append("name", this.signupForm.controls['name'].value);
        formData.append("surname", this.signupForm.controls['surname'].value); 
        formData.append("telephone", this.signupForm.controls['telephone'].value); 
        formData.append("education", this.signupForm.controls['education'].value); 
        formData.append("job_description", this.signupForm.controls['job_description'].value); 
        formData.append("email", this.signupForm.controls['email'].value); 
        formData.append("age", this.signupForm.controls['age'].value); 
        formData.append("password1", this.signupForm.controls['password1'].value); 
        formData.append("password2", this.signupForm.controls['password2'].value); 
        // formData.append("user_Image", this.signupForm.controls['user_Image'].value); 
        formData.append("user_Image", this.signupForm.controls['user_Image'].value);

        var xhttp = new XMLHttpRequest();
        var Router = this.router;
        var Decjwt = this.decjwt
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == XMLHttpRequest.DONE) {
              console.log(xhttp.status + xhttp.responseText);
              if(xhttp.status == 201){
                alert("User successfully created.")
                res = JSON.parse(xhttp.response) 
                var jwt = res.token
                sessionStorage.setItem('token',jwt);
                Decjwt = JSON.parse(JSON.stringify(dec_token(jwt)));
                sessionStorage.setItem('userid',Decjwt.userID);
                Router.navigateByUrl('/app/loggedin/start');
              }
    
          }
        }
        
        xhttp.open("POST", "http://localhost:3000/user/signup");//"http://localhost:3010");
        // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/user/signup");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        // const json = {
        //   "name": this.signupForm.controls['firstname'].value,
        //   "surname": this.signupForm.controls['lastname'].value,
        //   "telephone": this.signupForm.controls['telephone'].value,
        //   "education": this.signupForm.controls['education'].value,
        //   "job_description": this.signupForm.controls['job_description'].value,
        //   "email": this.signupForm.controls['email'].value,
        //   "password1": this.signupForm.controls['password'].value,
        //   "password2": this.signupForm.controls['password_verification'].value,
        //   "age": this.signupForm.controls['age'].value
        // };
        // console.log(json)

        // xhttp.send(JSON.stringify(json));
        xhttp.send(formData);


      }
    }
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
