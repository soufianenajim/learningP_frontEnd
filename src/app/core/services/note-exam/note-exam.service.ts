import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { NoteExam } from '../../models/note_exam.model';

@Injectable({
  providedIn: 'root'
})
export class NoteExamService {
  url = environment.baseUrl + "/noteExam";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(noteExam: NoteExam) {
    return this.httpClient.post(this.url + "/save-or-update", noteExam);
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
