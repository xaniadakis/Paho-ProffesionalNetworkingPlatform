import { Component, NgIterable, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { Posting, Postings, User } from './posting';
import { map } from 'rxjs/operators';
import { decodedjwt } from '../decodedjwt';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.css']
})

export class PostingsComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput:ElementRef;
  public commentForm: FormGroup;
  postingId = new FormControl('', [ ]);
  _owner_comm = new FormControl('', [ ]);
  comment_text = new FormControl('', [
    Validators.minLength(1),
  ]);

  public postingForm: FormGroup;
  _id = new FormControl('', [ ]);
  title = new FormControl('', [ ]);
  text = new FormControl('',  [
    Validators.minLength(1)
  ]);
  _owner = new FormControl('', [ ]);
  post_Image = new FormControl('', [ ]);
  post_Song = new FormControl('', [ ]);
  post_Video = new FormControl('', [ ]);

  likeForm = new FormGroup({
    postingId: new FormControl(),
  });

  comment;


  public submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {}
  isDataAvailable:boolean = false;
  postings: Array<Posting> = [];
  info: User;
  decjwt: decodedjwt;
  username: string;
  myImage: string;
  uploadedImage;

  async ngOnInit() {
    // console.log(localStorage.getItem('name'))
    // console.log(localStorage.getItem('userid'))
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data
    .subscribe( (response:any) => {
      console.log('postings FETCHING', response);
      // this.postings = JSON.parse(response);
      // let str: string = JSON.stringify(response);
      // console.log(str)
      // str = str.replace(/[{}]/g, '');
      // console.log(str)
      // this.postings = JSON.parse(str)
      // JSON.parse(JSON.stringify(response)) as Array<Posting>;
      let varia = JSON.parse(JSON.stringify(response));
      this.postings = varia.Postings;
      // this.info = varia.Info;
      console.log(this.postings)
      for(let i=0; i<this.postings.length; i++){
        this.postings[i].date =  this.postings[i].date.substring(0, this.postings[i].date.length - 8).replace("T", " ");
      }
      this.myImage = localStorage.getItem('user_Image');
      // console.log('infos for', this.info[0].name);
    });

    // this.username = this.info[0].name
    // this.myImage = this.info[0].user_Image
    this.isDataAvailable = true;
     
    // var jwt = localStorage.getItem('token');
    // this.decjwt = JSON.parse(JSON.stringify(dec_token(jwt)));
    // localStorage.setItem('userid',this.decjwt.userID);
    // console.log(this.decjwt.name)
    // localStorage.setItem('name',this.info[0].name);
    // localStorage.setItem('surname',this.info[0].surname);
    // localStorage.setItem('country',this.info[0].country);
    // localStorage.setItem('city',this.info[0].city);
    // localStorage.setItem('address',this.info[0].address);
    // localStorage.setItem('number',this.info[0].number);
    // localStorage.setItem('postcode',this.info[0].postcode);
    // localStorage.setItem('job_description',this.info[0].job_description);
    // localStorage.setItem('education',this.info[0].education);
    // localStorage.setItem('skills',this.info[0].skills);
    // localStorage.setItem('age',this.info[0].age);
    // localStorage.setItem('mobile',this.info[0].mobile);
    // localStorage.setItem('email',this.info[0].email);
    // localStorage.setItem('github',this.info[0].github);
    // localStorage.setItem('facebook',this.info[0].facebook);
    // localStorage.setItem('twitter',this.info[0].twitter);
    // localStorage.setItem('instagram',this.info[0].instagram);
    // localStorage.setItem('youtube',this.info[0].youtube);
    // localStorage.setItem('user_Image',this.info[0].user_Image);


    this.commentForm = this.formBuilder.group({
      postingId: this.postingId,
      _owner_comm: this._owner_comm,
      text: this.comment_text
      // password: this.password
    });
    this.likeForm = this.formBuilder.group({
      postingId: this.postingId
    });
    this.postingForm = this.formBuilder.group({
      title: this.title,
      text: this.text,
      _id: this._id,
      post_Image: this.post_Image,
      _owner: localStorage.getItem('userid'),
      token: localStorage.getItem('token'),
      // post_Song: this.post_Song,
      // post_Video: this.post_Video
      // comment: this.commentForm
      // password: this.password
    });
  }
  
  get formControl() {
    return this.postingForm.controls;
  }

  trackPost(index, posting) {
    console.log(posting);
    return posting ? posting._id : undefined;

  } 


  isNotBlack(pimage){
    if (pimage == "Solid_black.png" || pimage == "" || pimage == '' || pimage == null )
      return false;
    else return true;

  }

  isActive(val: boolean){
    return val;
  }

  notActive(val: boolean){
    return !val;
  }

  setId(postid) {
    console.log(postid);
    this.likeForm.setValue({postingId: postid})
    this.postingId = postid
  }

  // onFileChanged(): void {
  //   this.uploadedImage = this.fileInput.nativeElement.files[0];
  //   // var file = event.target.files[0];
  //   this.postingForm.controls['post_Image'].setValue(this.uploadedImage)
  // }
  onFileChanged(event: any): void {
    var file = event.target.files[0];
    this.postingForm.controls['post_Image'].setValue(file)
  }

  newPosting(): any {
    this.submitted = true;
    if (this.postingForm.valid) {
      console.log(this.postingForm.value);

      var formData = new FormData();
      formData.append("title", "DEFAULT_TITLE");//this.postingForm.controls['title'].value);
      formData.append("text", this.postingForm.controls['text'].value);
      // formData.append("_id", this.postingForm.controls['_id'].value);
      // formData.append("post_Image", this.postingForm.controls['post_Image'].value);
      // formData.append("post_Song", this.postingForm.controls['post_Song'].value);
      // formData.append("post_Video", this.postingForm.controls['post_Video'].value);
      // formData.append("token", localStorage.getItem('token'));
      formData.append("_owner", localStorage.getItem('userid'));

      // localStorage.setItem("user-Data", JSON.stringify(this.postingForm.value));
    //   const headerDict = {
    //     // "Target-URL": this.url,
    //     "Content-Type": undefined,
    //     // 'Access-Control-Allow-Headers': 'Content-Type',
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //     headers: headerDict, 
    // };
    //   this.http.posting("http://localhost:3000/startpage/posting", formData , requestOptions).subscribe(
    //     (response) => console.log(response),
    //     (error) => console.log(error),
    //   )

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            console.log(xhttp.status + xhttp.responseText);
            alert(xhttp.status)
            window.location.reload();
        }
      }
      
      xhttp.open("POST", "http://localhost:3000/postings");
      // xhttp.setRequestHeader("Content-Type", undefined);
      // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      // xhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

      // xhttp.send(formData);

      // var xhttp = new XMLHttpRequest();
      // var Router = this.router;
      // xhttp.onreadystatechange = function() {
      //   if (xhttp.readyState == XMLHttpRequest.DONE) {
      //     // console.log(formData)
      //       alert(xhttp.status + xhttp.response);

      //       // if(xhttp.status == 200)
      //       //   Router.navigateByUrl('/app/loggedin/start');  
      //   }
      // }
      // xhttp.open("POST", "http://localhost:3000/startpage/posting/");
      // // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/posting");
      // xhttp.setRequestHeader("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>");
      // // xhttp.setRequestHeader("Content-Length", "<calculated when request is sent>");
      // // xhttp.setRequestHeader("Host", "<calculated when request is sent>");
      // xhttp.setRequestHeader("Accept", "*/*");
      // // xhttp.setRequestHeader("Accept-Encoding", "gzip, deflate, bar");
      // // xhttp.setRequestHeader("Connection", "keep-alive");

      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      const json = {
        "title": "DEFAULT_TITLE",//this.postingForm.controls['title'].value,
        "text": this.postingForm.controls['text'].value,
        "_owner": localStorage.getItem('userid'),
        "token": localStorage.getItem('token'),
      };

      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
    }
  }

  // dataArrived(){
  //   this.isDataAvailable = true;
  // }

  // setPosts(p){
  //   this.postings = p;
  // }

  // getAllPosts(): any {
  //     var xhttp = new XMLHttpRequest();
  //     var Router = this.router;
  //     var Postings = this.postings;
  //     xhttp.open("GET", "http://localhost:3010");
  //     xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/posting/getallposts");
  //     // xhttp.send(formData);
  //     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //     xhttp.send(null);
  //     xhttp.onreadystatechange = () => {
  //       if (xhttp.readyState == XMLHttpRequest.DONE) {
  //         console.log("LOGNIBBA "+xhttp.response);
  //         this.setPosts(xhttp.response);
  //         this.dataArrived();
  //         return xhttp.response;
  //         alert(xhttp.response);
  //         console.log(xhttp.response)
  //           // if (xhttp.status == 200) {
  //           //     // check xmlHttp.responseText here;
  //           //     Postings = xhttp.response;
  //           //     console.log(xhttp.response);
  //           // } else {
  //           //     console.log(xhttp.response);
  //           // }
  //       }
  //   };
  //     // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
  //     // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
  // }


  likePosting(): void {

    // if (this.commentForm.valid) {
      // console.log(this.commentForm.value);

      // var formData = new FormData();

      // formData.append("posting", this.postingForm.controls['posting'].value);
      // localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      // this.http.posting('http://localhost:3010/user/login', localStorage).subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error),
      // )
      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      // console.log("formData")

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          // alert(xhttp.status + xhttp.response); 
          if(xhttp.status == 200)
            window.location.reload();
          else
            alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("POST", "http://localhost:3000/postings/like");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/posting/like");
      // xhttp.send(formData);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

      // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      const json = {
        "token": localStorage.getItem('token'),
        "postingId": this.postingId,
        // "text": this.commentForm.controls['text'].value,
        "userID": localStorage.getItem('userid')
      };
      // console.log("formData")
      // console.log(JSON.stringify(json))
      xhttp.send(JSON.stringify(json));
      // console.log("formData")

      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    // }
  }


  newComment(): void {
    this.commentForm = this.formBuilder.group({
      postingId: this.postingId,
      _owner_comm: this._owner_comm,
      text: this.comment_text
      // password: this.password
    });
    this.submitted = true;
    if (this.commentForm.valid) {
      // console.log(this.commentForm.value);

      // var formData = new FormData();

      // formData.append("posting", this.postingForm.controls['posting'].value);
      // localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      // this.http.posting('http://localhost:3010/user/login', localStorage).subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error),
      // )
      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          // alert(xhttp.status + xhttp.response); 
          // window.location.reload();
          if(xhttp.status == 201)
            window.location.reload();
          else
            alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("POST", "http://localhost:3000/postings/comment/"+ this.commentForm.controls['postingId'].value );//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/posting/comment/"+ this.commentForm.controls['postingId'].value );
      // xhttp.send(formData);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      const json = {
        "token": localStorage.getItem('token'),
        // "postingId": this.commentForm.controls['postingId'].value,
        "text": this.commentForm.controls['text'].value,
        "_owner": localStorage.getItem('userid')
      };

      console.log(JSON.stringify(json));
      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
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
