import { Component, OnInit } from "@angular/core";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import $ from "jquery";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent {
  private serverUrl = "http://localhost:8081/learning_backEnd/api/socket";
  private title = "WebSockets chat";
  private stompClient;
  userID;

  constructor(private tokenStorageService: TokenStorageService) {
    this.userID=this.tokenStorageService.getUser().id;
    console.log('userID',this.userID);
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      
      console.log('this.userID',this.userID);
      that.stompClient.subscribe("/chat/"+that.userID, (message) => {
        if (message.body) {
          console.log('message',message);
          $(".chat").append("<div class='message'>" + message.body + "</div>");
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message/1", {}, message);
    $("#input").val("");
  }
}
