import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Question } from '../../models/question.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = environment.baseUrl + "/question";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(question: Question) {
    return this.httpClient.post(this.url + "/save-or-update", question);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByQuiz(id){
    return this.httpClient.get(this.url + "/find-by-quiz/"+id);
  }
  findByTd(id){
    return this.httpClient.get(this.url + "/find-by-td/"+id);
  }

  findByExam(id){
    return this.httpClient.get(this.url + "/find-by-exam/"+id);
  }
}
