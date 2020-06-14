import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ConversationService {
  url = environment.baseUrl + "/conversation";
  constructor(private httpClient: HttpClient) {}

  countNotReadMsgs(idUser1, idUser2) {
    return this.httpClient.get(
      this.url + "/countNotReadMsgs/" + idUser1 + "/" + idUser2
    );
  }
  findMessages(idUser1, idUser2,page) {
    return this.httpClient.get(
      this.url + "/find_Messages/" + idUser1 + "/" + idUser2+"/"+page
    );
  }
  readMsg(idUser1, idUser2) {
    return this.httpClient.get(
      this.url + "/read/" + idUser1 + "/" + idUser2
    );
  }
}
