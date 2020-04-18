import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Cour } from "../../models/cour.model";
@Injectable({
  providedIn: "root"
})
export class CourseService {
  url = environment.baseUrl + "/cour";
  constructor(private httpClient: HttpClient) {}
  
  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(cour: Cour) {
    return this.httpClient.post(this.url + "/save-or-update", cour);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByModule(idModule){
    return this.httpClient.get(this.url + "/find-by-module/"+idModule);
  }
}
