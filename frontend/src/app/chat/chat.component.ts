import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Friend } from '../network/friend'
import { ChatService } from './chat.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  messages: Array<{user_name:String,message:String}> = [];
  timemessages: Array<{user_name:String,message:String, time:String}> = [];
  friends: Array<Friend> = [];
  friendsnames: Array<string> = [];
  public messageForm: FormGroup;
  text = new FormControl('', [ ]);
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, 
    private activatedRoute: ActivatedRoute, private chat: ChatService) { 
      var t:string = this.getTime()

      this.chat.read()
      .subscribe(data=>this.timemessages.push({user_name: data.user_name, message:data.message, time: t} ));
    }


  username: string = sessionStorage.getItem("name");
  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe( (response:any) => {
      console.log('friends FETCHING', response);
      this.friends = response
      console.log('friends FETCHED', this.friends);
      let varia = JSON.parse(JSON.stringify(response));
      this.friends = varia.Friends;
      for(let i=0; i<this.friends.length; i++){
        this.friendsnames[i] = this.friends[i].name 
      }
      console.log('friends FETCHED', this.friends);
    });
    this.messageForm = new FormGroup({
      text: this.text
   });
  }

  sendMessage()
  {
    this.messageForm = this.formBuilder.group({
      text: this.text
    });
    console.log("will send "+this.messageForm.controls['text'].value)
    this.chat.write(this.messageForm.controls['text'].value, this.username, );
    var t:string = this.getTime()
    this.timemessages.push({user_name:this.username , message:this.messageForm.controls['text'].value, time: t})
    this.messageForm.reset();  // Reset all form data
  }

  isNotBlack(pimage){
    if (pimage == "Solid_black.png" || pimage == "" || pimage == '' || pimage == null )
      return false;
    else return true;

  }

  isMyUsername(userName){
    if ( userName == this.username )
      return true;
    else return false;
  }

  notMyUsername(userName){
    if ( userName == this.username )
      return false;
    else return true;
  }

  getTime():string {
    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
  }

  isActive(val: boolean){
    return val;
  }

  notActive(val: boolean){
    return !val;
  }
}
