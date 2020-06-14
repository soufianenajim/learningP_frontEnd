import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import $ from "jquery";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { FormGroup, FormControl } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import {
  state,
  style,
  transition,
  animate,
  trigger,
  AUTO_STYLE,
} from "@angular/animations";
import { ConversationService } from "../../../core/services/conversation/conversation.service";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Subscription, Observable } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
export class Message {
  message: String;
  isSent: boolean;
  date:Date;
  isSamePerson:boolean
  constructor(message: String, isSent: boolean,date:Date, isSamePerson:boolean) {
    this.message = message;
    this.isSent = isSent;
    this.date=date;
    this.isSamePerson=isSamePerson;
  }
  
}
@Component({
  selector: "app-chat-user",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          transform: "translate3d(0, 0, 0)",
        })
      ),
      state(
        "out",
        style({
          transform: "translate3d(100%, 0, 0)",
        })
      ),
      transition("in => out", animate("400ms ease-in-out")),
      transition("out => in", animate("400ms ease-in-out")),
    ]),
    trigger("slideOnOff", [
      state(
        "on",
        style({
          transform: "translate3d(0, 0, 0)",
        })
      ),
      state(
        "off",
        style({
          transform: "translate3d(100%, 0, 0)",
        })
      ),
      transition("on => off", animate("400ms ease-in-out")),
      transition("off => on", animate("400ms ease-in-out")),
    ]),
    trigger("mobileMenuTop", [
      state(
        "no-block, void",
        style({
          overflow: "hidden",
          height: "0px",
        })
      ),
      state(
        "yes-block",
        style({
          height: AUTO_STYLE,
        })
      ),
      transition("no-block <=> yes-block", [animate("400ms ease-in-out")]),
    ]),
  ],
})
export class ChatComponent implements OnInit {
  @Input() user;
  @Input() isList = true;
  @Output() countMessages = new EventEmitter();
  private serverUrl = environment.baseUrl + "/socket";
  private title = "WebSockets chat";
  private stompClient;
  userID;
  chatInnerToggle = "off";
  messages: Message[] = [];
  countNotReadMessage = 0;
  sendForm = new FormGroup({
    message: new FormControl(""),
  });
  firstShow = true;
  pageIndex = 0;

  constructor(
    private tokenStorageService: TokenStorageService,
    private conversationService: ConversationService
  ) {}

  initializeWebSocketConnection() {
    this.conversationService
      .countNotReadMsgs(this.userID,this.user.id)
      .subscribe((resp: any) => {
        if (resp) {
          console.log("resp", resp);
          this.countNotReadMessage = resp;
          this.countMessages.emit({ count: resp, user: this.user.id });
        }
      });
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      console.log("this.userID", that.userID);
      that.stompClient.subscribe(
        "/chat/" + that.userID + "/" + that.user.id,
        (message) => {
         console.log('message',message);
          if (message.body) {
            const obj=JSON.parse(message.body);
            that.countNotReadMessage++;
        
            that.countMessages.emit({
              count: that.countNotReadMessage,
              user: that.user.id,
            });
            console.log('0',that.messages[0])
            //if(!that.messages[0].isSent){
           //   that.messages[0].isSamePerson=false;
          //    that.messages.unshift(new Message(obj.message, false,obj.time,false));
          ///    that.messages[0].isSamePerson=true; 
          //  }
         //   else{
              that.messages.unshift(new Message(obj.message, false,obj.time,false));
         //   }
            
            // console.log('that.messages before',that.messages);
            // that.messages.unshift(new Message(obj.message, false,obj.time,
            //   false));
            // console.log("that.messages after", that.messages);
          }
        }
      );
    });
  }

  sendMessage() {
    const message = this.sendForm.get("message").value;
    if(message!==""){
    this.messages.unshift(new Message(message, true,new Date(),false))
    this.sendForm.get("message").setValue("");
    this.stompClient.send(
      "/app/send/message/" + this.user.id + "/" + this.userID, {},
      message
    );
  }
  }

  ngOnInit() {
    this.userID = this.tokenStorageService.getUser().id;
    this.initializeWebSocketConnection();
  }

  toggleChatInner() {
    if (this.chatInnerToggle === "off" && this.firstShow) {
      console.log("dj");
      this.conversationService
        .findMessages(this.user.id, this.userID,this.pageIndex)
        .subscribe((resp) => {
          console.log('resp',resp);
          this.buildMessages(resp);
          this.firstShow = false;
        });
    }

    this.isList = !this.isList;
    this.chatInnerToggle = this.chatInnerToggle === "off" ? "on" : "off";
  }
  buildMessages(data) {
    console.log('data',data);
    for (const iterator of data) {
      if (iterator.userFrom.id === this.userID) {
        this.messages.push(new Message(iterator.message, true,iterator.time,false));
      } else {
       
          this.messages.push(new Message(iterator.message, false,iterator.time,true));
        
       
       
      }
    }
    console.log('messages',this.messages);
  }
  read() {
    this.countNotReadMessage = 0;
    this.countMessages.emit({ count: 0, user: this.user.id });
    this.conversationService
      .readMsg(this.userID,this.user.id)
      .subscribe((resp) => {
        console.log("resp", resp);
      });
  }
  onScroll() {
    this.pageIndex=this.pageIndex+1;
    this.conversationService
      .findMessages(this.user.id, this.userID,this.pageIndex)
      .subscribe((resp) => {
        console.log('resp',resp);
        this.buildMessages(resp);
        this.firstShow = false;
      });
  }
}
