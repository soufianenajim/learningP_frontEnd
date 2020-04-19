import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = environment.baseUrl + "/quiz";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(quiz: Quiz) {
    return this.httpClient.post(this.url + "/save-or-update", quiz);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByModule(moduleId){
    return this.httpClient.get(this.url+"/find-by-module/"+moduleId)
  }

}
