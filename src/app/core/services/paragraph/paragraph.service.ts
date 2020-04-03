import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Paragraphe } from '../../models/paragraphe.model';
@Injectable({
  providedIn: "root"
})
export class ParagraphService {
  url = environment.baseUrl + "/paragraphe";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(paragraphe: Paragraphe) {
    return this.httpClient.post(this.url + "/save-or-update", paragraphe);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
