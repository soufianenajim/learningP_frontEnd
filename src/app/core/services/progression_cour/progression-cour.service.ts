import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {ProgressionCour} from '../../models/progression_cour.model';

@Injectable({
  providedIn: "root"
})
export class ProgressionCourService {
  url = environment.baseUrl + "/progression-cour";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(progressionCour: ProgressionCour) {
    return this.httpClient.post(this.url + "/save-or-update", progressionCour);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
}
