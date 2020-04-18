import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Level } from '../../models/level.model';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  url = environment.baseUrl + "/level";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(level: Level) {
    return this.httpClient.post(this.url + "/save-or-update", level);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByOrganisation(idOrg){
    return this.httpClient.get(this.url + "/find-by-organization/" + idOrg);
  }

}
