import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Chapitre } from '../../models/chapitre.model';
@Injectable({
  providedIn: "root"
})
export class ChapterService {
  url = environment.baseUrl + "/chapitre";
  constructor(private httpClient: HttpClient) {}
  
  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(chapitre: Chapitre) {
    return this.httpClient.post(this.url + "/save-or-update", chapitre);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
