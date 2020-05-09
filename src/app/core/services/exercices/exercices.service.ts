import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Exercices } from '../../models/exercices.model';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {
  url = environment.baseUrl + "/exercices";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
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
  findByModuleAndType(moduleId,type){
    return this.httpClient.get(this.url+"/find-by-module-type/"+moduleId+"/"+type)
  }
  findByCourAndType(courId,type){
    return this.httpClient.get(this.url+"/find-by-cour-type/"+courId+"/"+type);
  }
  findByQuestion(questionId){
    return this.httpClient.get(this.url+"/find-by-question/"+questionId);
  }
  isExist(exercices){
    return this.httpClient.post(this.url+"/is_exist",exercices);
  }
}
