import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Cour } from "../../models/cour.model";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class CourseService {
  url = environment.baseUrl + "/cour";
  constructor(private httpClient: HttpClient) {}
  
  findAll() {
    return this.httpClient.get(this.url + "/find-all");
  }
  saveOrUpdate(cour: Cour,files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
for (const file of files) {
  formData.append('files', file);
}
    
    formData.append('cour', new Blob([JSON.stringify(cour)],
    {
        type: "application/json"
    }));

    const req = new HttpRequest('POST', `${this.url}/save-with-file`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
   // return this.httpClient.post(this.url + "/save-or-update", cour);
  }
  searchByCritere(demande) {
    console.log("demande", demande);
    return this.httpClient.post(this.url + "/find-by-critere", demande);
  }
  delete(id) {
    return this.httpClient.delete(this.url + "/delete/" + id);
  }
  deleteAttachment(id,fileName){
    return this.httpClient.delete(this.url+"/deleteAttachment/"+id+"/"+fileName)
  }
  findByModule(idModule){
    return this.httpClient.get(this.url + "/find-by-module/"+idModule);
  }
  findByModuleAndNotLaunchd(idModule){
    return this.httpClient.get(this.url + "/find-by-module-and-not-launched/"+idModule);
    
  }
  launch(idCour){
    return this.httpClient.get(this.url + "/launch/"+idCour);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.url}/files`);
  }
  loadAttachment(idCour,nameFile){
    return this.httpClient.get(this.url + "/load/"+idCour+"/"+nameFile);
  }
}
