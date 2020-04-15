import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {ProgressionModule} from '../../models/progression_module.model';

@Injectable({
  providedIn: "root"
})
export class ProgressionModuleService {
  url = environment.baseUrl + "/progression-module";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(progressionModule: ProgressionModule) {
    return this.httpClient.post(this.url + "/save-or-update", progressionModule);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
