import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Td } from "../../models/td.model";
@Injectable({
  providedIn: "root"
})
export class TdService {
  url = environment.baseUrl + "/td";
  constructor(private httpClient: HttpClient) {}
  saveOrUpdate(td: Td) {
    return this.httpClient.post(this.url + "/save-or-update", td);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByCour(id){
    return this.httpClient.get(this.url+"/find-by-cour/"+id);
  }
}
