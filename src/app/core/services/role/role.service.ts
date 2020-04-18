import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class RoleService {
  url = environment.baseUrl + "/role";
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
 
}
