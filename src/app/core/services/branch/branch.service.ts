import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Branch } from '../../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  url = environment.baseUrl + "/branch";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(branch: Branch) {
    return this.httpClient.post(this.url + "/save-or-update", branch);
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
