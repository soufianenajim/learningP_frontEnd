import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.baseUrl + "/user";
  constructor(private httpClient: HttpClient) {}
  findById(id: number) {
    console.log("url---------------------", this.url + "/find-by-id/" + id);
    return this.httpClient.get(this.url + "/find-by-id/" + id);
  }
  findAllProfessor() {
    return this.httpClient.get(this.url + "/find-all-professor");
  }
  saveOrUpdate(user: User) {
    return this.httpClient.post(this.url + "/save-or-update", user);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
