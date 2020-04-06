import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Exam } from '../../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  url = environment.baseUrl + "/exam";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(exam: Exam) {
    return this.httpClient.post(this.url + "/save-or-update", exam);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }

}
