import { Component, NgIterable, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { Post, Posts, User } from './post';
import { map } from 'rxjs/operators';
import { decodedjwt } from '../decodedjwt';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput:ElementRef;
  public APIURL: string = GlobalConstants.APIURL;
  public commentForm: FormGroup;
  postId = new FormControl('', [ ]);
  _owner_comm = new FormControl('', [ ]);
  comment_text = new FormControl('', [
    Validators.minLength(1),
  ]);

  public postForm: FormGroup;
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
    postId: new FormControl(),
  });

  comment;


  public submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {}
  isDataAvailable:boolean = false;
  posts: Array<Post> = [];
  info: User;
  decjwt: decodedjwt;
  username: string;
  myImage: string;
  uploadedImage;

  async ngOnInit() {
    console.log(sessionStorage.getItem('name'))
    console.log(sessionStorage.getItem('userid'))
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data
    .subscribe( (response:any) => {
      console.log('posts FETCHING', response);
      // this.posts = JSON.parse(response);
      // let str: string = JSON.stringify(response);
      // console.log(str)
      // str = str.replace(/[{}]/g, '');
      // console.log(str)
      // this.posts = JSON.parse(str)
      // JSON.parse(JSON.stringify(response)) as Array<Post>;
      let varia = JSON.parse(JSON.stringify(response));
      this.posts = varia.Posts;
      this.info = varia.Info;
      for(let i=0; i<this.posts.length; i++){
        this.posts[i].date =  this.posts[i].date.substring(0, this.posts[i].date.length - 8).replace("T", " ");
      }
      console.log('infos for', this.info[0].name);
    });

    this.username = this.info[0].name
    this.myImage = this.info[0].user_Image
    this.isDataAvailable = true;
     
    var jwt = sessionStorage.getItem('token');
    this.decjwt = JSON.parse(JSON.stringify(dec_token(jwt)));
    sessionStorage.setItem('userid',this.decjwt.userID);
    // console.log(this.decjwt.name)
    sessionStorage.setItem('name',this.info[0].name);
    sessionStorage.setItem('surname',this.info[0].surname);
    // sessionStorage.setItem('country',this.info[0].country);
    // sessionStorage.setItem('city',this.info[0].city);
    // sessionStorage.setItem('address',this.info[0].address);
    // sessionStorage.setItem('number',this.info[0].number);
    // sessionStorage.setItem('postcode',this.info[0].postcode);
    sessionStorage.setItem('job_description',this.info[0].job_description);
    sessionStorage.setItem('education',this.info[0].education);
    // sessionStorage.setItem('skills',this.info[0].skills);
    // sessionStorage.setItem('age',this.info[0].age);
    // sessionStorage.setItem('mobile',this.info[0].mobile);
    sessionStorage.setItem('email',this.info[0].email);
    // sessionStorage.setItem('github',this.info[0].github);
    // sessionStorage.setItem('facebook',this.info[0].facebook);
    // sessionStorage.setItem('twitter',this.info[0].twitter);
    // sessionStorage.setItem('instagram',this.info[0].instagram);
    // sessionStorage.setItem('youtube',this.info[0].youtube);
    sessionStorage.setItem('user_Image',this.info[0].user_Image);


    this.commentForm = this.formBuilder.group({
      postId: this.postId,
      _owner_comm: this._owner_comm,
      text: this.comment_text
      // password: this.password
    });
    this.likeForm = this.formBuilder.group({
      postId: this.postId
    });
    this.postForm = this.formBuilder.group({
      title: this.title,
      text: this.text,
      _id: this._id,
      post_Image: this.post_Image,
      _owner: sessionStorage.getItem('userid'),
      token: sessionStorage.getItem('token'),
      post_Song: this.post_Song,
      post_Video: this.post_Video
      // comment: this.commentForm
      // password: this.password
    });
  }
  
  get formControl() {
    return this.postForm.controls;
  }

  trackPost(index, post) {
    console.log(post);
    return post ? post._id : undefined;

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
    this.likeForm.setValue({postId: postid})
    this.postId = postid
  }

  // onFileChanged(): void {
  //   this.uploadedImage = this.fileInput.nativeElement.files[0];
  //   // var file = event.target.files[0];
  //   this.postForm.controls['post_Image'].setValue(this.uploadedImage)
  // }
  onFileChanged(event: any): void {
    var file = event.target.files[0];
    this.postForm.controls['post_Image'].setValue(file)
  }

  newPost(): any {
    this.submitted = true;
    if (this.postForm.valid) {
      console.log(this.postForm.value);

      var formData = new FormData();
      formData.append("title", "DEFAULT_TITLE");//this.postForm.controls['title'].value);
      formData.append("text", this.postForm.controls['text'].value);
      // formData.append("_id", this.postForm.controls['_id'].value);
      formData.append("post_Image", this.postForm.controls['post_Image'].value);
      // formData.append("post_Song", this.postForm.controls['post_Song'].value);
      // formData.append("post_Video", this.postForm.controls['post_Video'].value);
      // formData.append("token", sessionStorage.getItem('token'));
      formData.append("_owner", sessionStorage.getItem('userid'));

      // sessionStorage.setItem("user-Data", JSON.stringify(this.postForm.value));
    //   const headerDict = {
    //     // "Target-URL": this.url,
    //     "Content-Type": undefined,
    //     // 'Access-Control-Allow-Headers': 'Content-Type',
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //     headers: headerDict, 
    // };
    //   this.http.post("http://localhost:3000/startpage/post", formData , requestOptions).subscribe(
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
      
      xhttp.open("POST", GlobalConstants.APIURL+"startpage/post");
      // xhttp.setRequestHeader("Content-Type", undefined);
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

      xhttp.send(formData);

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
      // xhttp.open("POST", "http://localhost:3000/startpage/post/");
      // // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/post");
      // xhttp.setRequestHeader("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>");
      // // xhttp.setRequestHeader("Content-Length", "<calculated when request is sent>");
      // // xhttp.setRequestHeader("Host", "<calculated when request is sent>");
      // xhttp.setRequestHeader("Accept", "*/*");
      // // xhttp.setRequestHeader("Accept-Encoding", "gzip, deflate, bar");
      // // xhttp.setRequestHeader("Connection", "keep-alive");

      // // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      // const json = {
      //   "title": "boi",//this.postForm.controls['title'].value,
      //   "text": this.postForm.controls['text'].value,
      //   "_owner": sessionStorage.getItem('userid'),
      //   "token": sessionStorage.getItem('token'),
      // };

      // xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
    }
  }

  // dataArrived(){
  //   this.isDataAvailable = true;
  // }

  // setPosts(p){
  //   this.posts = p;
  // }

  // getAllPosts(): any {
  //     var xhttp = new XMLHttpRequest();
  //     var Router = this.router;
  //     var Posts = this.posts;
  //     xhttp.open("GET", "http://localhost:3010");
  //     xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/post/getallposts");
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
  //           //     Posts = xhttp.response;
  //           //     console.log(xhttp.response);
  //           // } else {
  //           //     console.log(xhttp.response);
  //           // }
  //       }
  //   };
  //     // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
  //     // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
  // }


  likePost(): void {

    // if (this.commentForm.valid) {
      // console.log(this.commentForm.value);

      // var formData = new FormData();

      // formData.append("post", this.postForm.controls['post'].value);
      // sessionStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      // this.http.post('http://localhost:3010/user/login', sessionStorage).subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error),
      // )
      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      // console.log("formData")

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          // alert(xhttp.status + xhttp.response); 
          if(xhttp.status == 200){
            alert("Liked post");
            window.location.reload();
          }else
            alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("POST", GlobalConstants.APIURL+"startpage/post/like");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/post/like");
      // xhttp.send(formData);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

      // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      const json = {
        "token": sessionStorage.getItem('token'),
        "postId": this.postId,
        // "text": this.commentForm.controls['text'].value,
        "userID": sessionStorage.getItem('userid')
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
      postId: this.postId,
      _owner_comm: this._owner_comm,
      text: this.comment_text
      // password: this.password
    });
    this.submitted = true;
    if (this.commentForm.valid) {
      // console.log(this.commentForm.value);

      // var formData = new FormData();

      // formData.append("post", this.postForm.controls['post'].value);
      // sessionStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      // this.http.post('http://localhost:3010/user/login', sessionStorage).subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error),
      // )
      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          // alert(xhttp.status + xhttp.response); 
          // window.location.reload();
          if(xhttp.status == 201){
            alert("Comment posted"); 
            window.location.reload();
          }
          else
            alert(xhttp.status + xhttp.response); 
        }
      }
      xhttp.open("POST", GlobalConstants.APIURL+"startpage/post/comment/"+ this.commentForm.controls['postId'].value );//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/startpage/post/comment/"+ this.commentForm.controls['postId'].value );
      // xhttp.send(formData);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      const json = {
        "token": sessionStorage.getItem('token'),
        // "postId": this.commentForm.controls['postId'].value,
        "text": this.commentForm.controls['text'].value,
        "_owner": sessionStorage.getItem('userid')
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