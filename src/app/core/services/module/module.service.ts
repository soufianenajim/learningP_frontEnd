import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Module } from '../../models/module.model';

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  url = environment.baseUrl + "/module";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  findByLevelAndBranch(idLevel,idBranch){
    return this.httpClient.get(this.url + "/find-by-level-and-branch/"+idLevel+"/"+idBranch);
  }
  saveOrUpdate(module: Module) {
    return this.httpClient.post(this.url + "/save-or-update", module);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
