import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  
  url = environment.baseUrl + "/user";
  constructor(private httpClient: HttpClient) {}
  findById(id: number) {
    console.log('url---------------------',this.url + "/find-by-id/" + id)
    return this.httpClient.get(this.url + "/find-by-id/" + id);
  }
}
