import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Suggestion } from '../../models/suggestion.model';

@Injectable({
  providedIn: "root"
})
export class SuggestionService {
  url = environment.baseUrl + "/suggestion";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(suggestion: Suggestion) {
    return this.httpClient.post(this.url + "/save-or-update", suggestion);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
