import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.baseUrl + "/dashboard";
  constructor(private httpClient: HttpClient) {}

  countModuleByTeacherAndGroupe(idTeacher,idGroup){
    return this.httpClient.get(this.url+'/countModuleByTeacherAndGroupe/'+idTeacher+"/"+idGroup);
  }
  countExamByTeacherAndGroupeAndType(idTeacher,idGroup,type){
    return this.httpClient.get(this.url+'/countExamByTeacherAndGroupe/'+idTeacher+"/"+idGroup+"/"+type);
  }
  
  countCourByTeacherAndGroupe(idTeacher,idGroup){
    return this.httpClient.get(this.url+'/countCourByTeacherAndGroupe/'+idTeacher+"/"+idGroup);
  }
  countStudentByTeacherAndGroupe(idTeacher,idGroup){
    return this.httpClient.get(this.url+'/countStudentByTeacherAndGroupe/'+idTeacher+"/"+idGroup);
  }
  getAverageGoodAndBadGrades(idTeacher,idGroup,idModule){
   
    return this.httpClient.get(this.url+'/getAverageGoodAndBadGrades/'+idTeacher+"/"+idGroup+"/"+idModule);
  }
  getAverageSuccessStudent(idTeacher,idGroup,idModule){
   
    return this.httpClient.get(this.url+'/getAverageSuccessStudent/'+idTeacher+"/"+idGroup+"/"+idModule);
  }
}
