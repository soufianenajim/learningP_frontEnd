import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Module } from '../../models/module.model';

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  url = environment.baseUrl + "/module-affected";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  findByGroup(idGroup){
    return this.httpClient.get(this.url + "/find-by-group/"+idGroup);
  }
  findByProfessor(idProfessor){
    return this.httpClient.get(this.url + "/find-by-professor/"+idProfessor);
  }
  findByProfessorAndGroup(idProfessor,idGroup){
    return this.httpClient.get(this.url+"/find-by-professor-group/"+idProfessor+"/"+idGroup)
  }
  saveOrUpdate(module: Module) {
    return this.httpClient.post(this.url + "/save-or-update", module);
  }
  searchByCritere(demande) {
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  calculate(module){
    return this.httpClient.post(this.url+"/calculate",module);
  }

}
