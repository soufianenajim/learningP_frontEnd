import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Exercices } from "../../models/exercices.model";
@Injectable({
  providedIn: "root"
})
export class ExercicesService {
  url = environment.baseUrl + "/exercices";
  constructor(private httpClient: HttpClient) {}
  saveOrUpdate(exercices: Exercices) {
    return this.httpClient.post(this.url + "/save-or-update", exercices);
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
  findByModule(idModule){
    return this.httpClient.get(this.url + "/find-by-module/"+idModule);
  }
}
