import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { User } from "../../models/user.model";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url = environment.baseUrl + "/user";
  constructor(private httpClient: HttpClient) {}
  findById(id: number) {
    console.log("url---------------------", this.url + "/find-by-id/" + id);
    return this.httpClient.get(this.url + "/find-by-id/" + id);
  }
  findAllProfessorByOrga(idOrga) {
    return this.httpClient.get(this.url + "/find-all-professor-by-orga/"+idOrga);
  }
  findAllByOrgaWithoutUser(idOrga,idUser) {
    return this.httpClient.get(this.url + "/find-by-organization/"+idOrga+"/"+idUser);
  }
  saveOrUpdate(user: User) {
    return this.httpClient.post(this.url + "/save-or-update", user);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  getNotificationsByUser(idUser){
    return this.httpClient.get(this.url+"/notifications/"+idUser);
  }
  findbyNameContainingByExam(name:string,idExam){
    console.log("find;")
    if(name.length>=2){
      return this.httpClient.get(this.url + "/findbyNameContaining/"+ name+"/"+idExam);
    }
    return of([]);
    
  }
  timeOfBlock(email: String): Observable<any> {
    return this.httpClient.post(this.url+"/timeOfBlock", email);
}
}
