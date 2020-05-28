import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { ModuleName } from '../../models/module_name.model';

@Injectable({
  providedIn: "root"
})
export class ModuleNameService {
  url = environment.baseUrl + "/module";
  constructor(private httpClient: HttpClient) {}
  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(moduleName: ModuleName) {
    return this.httpClient.post(this.url + "/save-or-update", moduleName);
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
