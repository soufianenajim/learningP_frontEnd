import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Session } from '../../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url = environment.baseUrl + "/session";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(session: Session) {
    return this.httpClient.post(this.url + "/save-or-update", session);
  }
  searchByCritere(demande) {
    console.log("demande",this.url);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByOrganisation(idOrg){
    return this.httpClient.get(this.url + "/find-by-organization/" + idOrg);
  }

}
