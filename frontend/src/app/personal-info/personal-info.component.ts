import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { User } from './user';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  public infoForm: FormGroup;

  email = new FormControl('', [ ]);
  name = new FormControl('', [ ]);
  surname = new FormControl('', [ ]);
  country = new FormControl('', [ ]);
  city = new FormControl('', [ ]);
  address = new FormControl('', [ ]);
  number = new FormControl('', [ ]);
  postcode = new FormControl('', [ ]);
  job_description = new FormControl('', [ ]);
  education = new FormControl('', [ ]);
  skills = new FormControl('', [ ]);
  age = new FormControl('', [ ]);
  mobile = new FormControl('', [ ]);
  github = new FormControl('', [ ]);
  facebook = new FormControl('', [ ]);
  twitter = new FormControl('', [ ]);
  instagram = new FormControl('', [ ]);
  youtube = new FormControl('', [ ]);
  // _user_Image: string;

  info: User;
  _email: string;
  _name: string;
  _surname: string;
  _country: string ;
  _city: string;
  _address: string ;
  _number: number;
  _postcode: string;
  _job_description: string;
  _education: string ;
  _skills: string;
  _age: string ;
  _mobile: number;
  _github: string ;
  _facebook: string;
  _twitter: string;
  _instagram: string ;
  _youtube: string;
  user_Image: string;
  isDataAvailable:boolean = false;
  public submitted = false;
  // email: string = sessionStorage.getItem('email')
  // name: string = sessionStorage.getItem('name')
  // surname: string = sessionStorage.getItem('surname');
  // country: string = sessionStorage.getItem('country');
  // city: string = sessionStorage.getItem('city');
  // address: string = sessionStorage.getItem('address');
  // number: string = sessionStorage.getItem('number');
  // postcode: string = sessionStorage.getItem('postcode');
  // job_description: string = sessionStorage.getItem('job_description');
  // education: string = sessionStorage.getItem('education');
  // skills: string = sessionStorage.getItem('skills');
  // age: string = sessionStorage.getItem('age');
  // mobile: string = sessionStorage.getItem('mobile');
  // github: string = sessionStorage.getItem('github');
  // facebook: string = sessionStorage.getItem('facebook');
  // twitter: string = sessionStorage.getItem('twitter');
  // instagram: string = sessionStorage.getItem('instagram');
  // youtube: string = sessionStorage.getItem('youtube');
  // user_Image: string = sessionStorage.getItem('user_Image');
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
      this.info = varia.Info;
      console.log('info FETCHED', this.info[0]);
    });
    this._email = this.info[0].email || "";
    this._name = this.info[0].name || "";
    this._surname = this.info[0].surname || "";
    this._country = this.info[0].country || "";
    this._city = this.info[0].city || "";
    this._address = this.info[0].address || "";
    this._number = this.info[0].number || null;
    this._postcode = this.info[0].postcode || "";
    this._job_description = this.info[0].job_description || "";
    this._education = this.info[0].education || "";
    this._skills = this.info[0].skills || "";
    this._age = this.info[0].age || "";
    this._mobile = this.info[0].mobile || null;
    this._github = this.info[0].github || "";
    this._facebook = this.info[0].facebook || "";
    this._twitter = this.info[0].twitter || "";
    this._instagram = this.info[0].instagram || "";
    this._youtube = this.info[0].youtube || "";

    this.user_Image = this.info[0].user_Image;
    this.infoForm = new FormGroup({
      email: this.email,
      name: this.name,
      surname: this.surname,
      country: this.country,
      city: this.city,
      address: this.address,
      number: this.number,
      postcode: this.postcode,
      job_description: this.job_description,
      education: this.education,
      skills: this.skills,
      age: this.age,
      mobile: this.mobile,
      github: this.github,
      facebook: this.facebook,
      twitter: this.twitter,
      instagram: this.instagram,
      youtube: this.youtube
   });
    this.infoForm.controls

    this.isDataAvailable = true;
  }
  putPersonalInfo(): any {
    this.submitted = true;
    this.infoForm = this.formBuilder.group({
      email: (this.infoForm.controls['email'].value != "") ? this.email : this._email,
      name: ( this.infoForm.controls['name'].value != "") ? this.name : this._name,  
      surname: ( this.infoForm.controls['surname'].value != "") ? this.surname : this._surname, 
      country: ( this.infoForm.controls['country'].value != "") ? this.country : this._country, 
      city: ( this.infoForm.controls['city'].value != "") ? this.city : this._city,  
      address: ( this.infoForm.controls['address'].value != "") ? this.address : this._address, 
      number: ( this.infoForm.controls['number'].value != null) ? this.number : this._number,  
      postcode: ( this.infoForm.controls['postcode'].value != "") ? this.postcode : this._postcode,  
      job_description: ( this.infoForm.controls['job_description'].value != "") ? this.job_description : this._job_description,
      education: ( this.infoForm.controls['education'].value != "") ? this.education : this._education, 
      skills: ( this.infoForm.controls['skills'].value != "") ? this.skills : this._skills, 
      age: ( this.infoForm.controls['age'].value != "") ? this._age : this._age, 
      mobile: ( this.infoForm.controls['mobile'].value != null) ? this.mobile : this._mobile,  
      github: ( this.infoForm.controls['github'].value != "") ? this.github : this._github,  
      facebook: ( this.infoForm.controls['facebook'].value != "") ? this.facebook : this._facebook, 
      twitter: ( this.infoForm.controls['twitter'].value != "") ? this.twitter : this._twitter, 
      instagram: ( this.infoForm.controls['instagram'].value != "") ? this.instagram : this._instagram,
      youtube: ( this.infoForm.controls['youtube'].value != "") ? this.youtube : this._youtube
      // user_Image: this._user_Image
    });
    if (this.infoForm.valid) {
      console.log(this.infoForm.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            alert(xhttp.status + xhttp.response); 
            window.location.reload();
        }
      }
      xhttp.open("PATCH", GlobalConstants.APIURL+"personalInfo/"+sessionStorage.getItem('userid'));//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      const json = {
        "email": this.infoForm.controls['email'].value,
        "name": this.infoForm.controls['name'].value,
        "surname": this.infoForm.controls['surname'].value,
        "country": this.infoForm.controls['country'].value,
        "city": this.infoForm.controls['city'].value,
        "address": this.infoForm.controls['address'].value,
        "number": this.infoForm.controls['number'].value,
        "postcode": this.infoForm.controls['postcode'].value,
        "job_description": this.infoForm.controls['job_description'].value,
        "education": this.infoForm.controls['education'].value,
        "skills": this.infoForm.controls['skills'].value,
        "age": this.infoForm.controls['age'].value,
        "mobile": this.infoForm.controls['mobile'].value,
        "github": this.infoForm.controls['github'].value,
        "facebook": this.infoForm.controls['facebook'].value,
        "twitter": this.infoForm.controls['twitter'].value,
        "instagram": this.infoForm.controls['instagram'].value,
        "youtube": this.infoForm.controls['youtube'].value
      };

      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  }

}
