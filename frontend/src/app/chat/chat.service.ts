import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from "rxjs";
import { GlobalConstants } from "../common/global-constants";
 
@Injectable()

export class ChatService{

    private socket =  io.io(GlobalConstants.SOCKETURL, { query: { user_name: sessionStorage.getItem("name") }});  

    write(message, username){
        this.socket.emit('message',message);
        // console.log(message)
    }

    read(){
        let observable = new Observable<{user_name:String, message:String, time: String}>(observer=>{
            this.socket.on('message-broadcast', (data)=>{
                console.log(data)
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}