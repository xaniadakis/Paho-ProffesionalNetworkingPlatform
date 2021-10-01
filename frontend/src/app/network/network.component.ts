import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Friend } from './friend'
import { User } from './network'
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) { }
  friends: Array<Friend> = [];
  network: Array<User> = [];
  myImage: string;
  public addForm: FormGroup;
  _to_friend = new FormControl('', [ ]);
  _owner = new FormControl('', [ ]);
  submitted:boolean = false;
  ngOnInit(): void {
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data
    .subscribe( (response:any) => {
      let varia = JSON.parse(JSON.stringify(response));
      this.friends = varia.All;
      this.network = varia.All;
      console.log('FETCHED', this.friends, this.network );
    });
    this.myImage = localStorage.getItem('user_Image');
    this.addForm = new FormGroup({
      _to_friend: this._to_friend,
      _owner: this._owner
    });
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

  setID(id) {
    console.log(id);
    // this.addForm.setValue({_to_friend: id})
    // this.addForm.setValue({_owner: localStorage.getItem('userid')})
    this._to_friend = id
  }


  sendRequest(){
    console.log("this.addForm.value");
    this.submitted = true;
    this.addForm = this.formBuilder.group({
      _to_friend: this._to_friend,
      _owner: localStorage.getItem('userid')   
    });
    // if (this.addForm.valid) {
      console.log(this.addForm.value);

      var xhttp = new XMLHttpRequest();
      var Router = this.router;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            alert(xhttp.status + xhttp.response); 
            // window.location.reload();
        }
      }
      xhttp.open("POST", "http://localhost:3000/requests/create/");//"http://localhost:3010");
      // xhttp.setRequestHeader("Target-URL", "http://localhost:3000/settings/mail");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhttp.send(formData);
      const json = {
        "_owner": localStorage.getItem('userid'),
        "_to_friend":  this.addForm.controls['_to_friend'].value
      }
      xhttp.send(JSON.stringify(json));
      // xhttp.send(JSON.stringify({ "email": "admin@di.uoa.gr", "password": "admin" }));
      // console.log(JSON.stringify({ "email": this.loginForm.controls['email'].value, "password": this.loginForm.controls['password'].value }));
      // window.location.reload();
    }
  // }
}
