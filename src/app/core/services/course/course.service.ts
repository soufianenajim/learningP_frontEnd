import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class CourseService {
  url = environment.baseUrl + "/cour";
  constructor(private httpClient: HttpClient) {}
  
  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
}
