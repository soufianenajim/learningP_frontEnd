import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Group } from "../../models/group.model";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  url = environment.baseUrl + "/group";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(group: Group) {
    return this.httpClient.post(this.url + "/save-or-update", group);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  findByOrganization(id) {
    return this.httpClient.get(this.url + "/find-by-organization/" + id);
  }
  findByUser(id) {
    return this.httpClient.get(this.url + "/find-by-user/" + id);
  }
  findByOrganizationAndLevelAndBranch(idOrg, idLevel, idBranch) {
    return this.httpClient.get(
      this.url +
        "/findByOrganizationAndLevelAndBranch/" +
        idOrg +
        "/" +
        idLevel +
        "/" +
        idBranch
    );
  }
}
