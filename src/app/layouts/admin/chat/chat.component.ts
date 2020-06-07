import { Component, OnInit, Input } from "@angular/core";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import $ from "jquery";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { FormGroup, FormControl } from "@angular/forms";
import { environment } from "../../../../environments/environment";
export class Message{
  message:String;
  isSent:boolean;
  constructor(message:String,isSent:boolean){
    this.message=message;
    this.isSent=isSent;
  } 
 }
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
@Input() user;
private serverUrl = environment.baseUrl + "/socket";
private title = "WebSockets chat";
private stompClient;
userID;
messages:Message[]=[];

sendForm = new FormGroup({
  message: new FormControl(""),
});
constructor(private tokenStorageService: TokenStorageService) {
  this.userID=this.tokenStorageService.getUser().id;
  console.log('userID',this.userID);
  this.initializeWebSocketConnection();
}

initializeWebSocketConnection() {
console.log('user,id',this.user);
  let ws = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(ws);
  let that = this;
  this.stompClient.connect({}, function (frame) {
    
    console.log('this.userID',that.userID);
    that.stompClient.subscribe("/chat/"+that.userID+"/"+that.user.id, (message) => {
      if (message.body) {
        console.log('message',message);
        that.messages.push(new Message(message.body,false));
        console.log(message.body);
      }
    });
  });
}

sendMessage() {
  
  const message=this.sendForm.get('message').value;
  this.messages.push(new Message(message,true));
  this.sendForm.get('message').setValue('');
  this.stompClient.send("/app/send/message/"+this.user.id+"/"+this.userID, {}, message);
}


  ngOnInit() {
    console.log('ngOnInit');
    console.log('user',this.user);
  }

}
