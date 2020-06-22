import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  url = environment.baseUrl + "/dashboard";
  constructor(private httpClient: HttpClient) {}

  countModuleByTeacherAndGroupe(idTeacher, idGroup) {
    return this.httpClient.get(
      this.url + "/countModuleByTeacherAndGroupe/" + idTeacher + "/" + idGroup
    );
  }
  countExamByTeacherAndGroupeAndType(idTeacher, idGroup, type) {
    return this.httpClient.get(
      this.url +
        "/countExamByTeacherAndGroupe/" +
        idTeacher +
        "/" +
        idGroup +
        "/" +
        type
    );
  }

  countCourByTeacherAndGroupe(idTeacher, idGroup) {
    return this.httpClient.get(
      this.url + "/countCourByTeacherAndGroupe/" + idTeacher + "/" + idGroup
    );
  }
  countStudentByTeacherAndGroupe(idTeacher, idGroup) {
    return this.httpClient.get(
      this.url + "/countStudentByTeacherAndGroupe/" + idTeacher + "/" + idGroup
    );
  }
  getAverageGoodAndBadGrades(idTeacher, idGroup, idModule) {
    return this.httpClient.get(
      this.url +
        "/getAverageGoodAndBadGrades/" +
        idTeacher +
        "/" +
        idGroup +
        "/" +
        idModule
    );
  }
  getAverageSuccessStudent(idTeacher, idGroup, idModule) {
    return this.httpClient.get(
      this.url +
        "/getAverageSuccessStudent/" +
        idTeacher +
        "/" +
        idGroup +
        "/" +
        idModule
    );
  }
  getAverageSuccessStudentByOrg(idOrg, idLevel, idBranch,idGroup) {
    return this.httpClient.get(
      this.url +
        "/getAverageSuccessStudentByOrg/" +
        idOrg+
        "/" +
        idLevel +
        "/" +
        idBranch+
        "/"+
        idGroup
    );
  }
  countModuleByStudent(idStudent) {
    return this.httpClient.get(this.url + "/countModuleByStudent/" + idStudent);
  }
  countExamByStudentAndModuleAndType(idStudent, idModule, type) {
    return this.httpClient.get(
      this.url +
        "/countExamByStudentAndModule/" +
        idStudent +
        "/" +
        idModule +
        "/" +
        type
    );
  }
  countCourseByStudentAndModule(idStudent, idModule) {
    return this.httpClient.get(
      this.url + "/countCourseByStudentAndModule/" + idStudent + "/" + idModule
    );
  }
  countUseryOrganizationAndLevelAndBranch(
    idOrg,
    idLevel,
    idBranch,
    idGroup,
    role
  ) {
    return this.httpClient.get(
      this.url +
        "/countUseryOrganizationAndLevelAndBranchAndGroup/" +
        idOrg +
        "/" +
        idLevel +
        "/" +
        idBranch +
        "/" +
        idGroup +
        "/" +
        role
    );
  }
  countModuleyOrganizationAndLevelAndBranchAndGroup(
    idOrg,
    idLevel,
    idBranch,
    idGroup
  ) {
    return this.httpClient.get(
      this.url +
        "/countModuleyOrganizationAndLevelAndBranchAndGroup/" +
        idOrg +
        "/" +
        idLevel +
        "/" +
        idBranch +
        "/" +
        idGroup
    );
  }
  countBranchByOrganization(idOrg) {
    return this.httpClient.get(
      this.url + "/countBranchByOrganization/" + idOrg
    );
  }
  countLevelByOrganization(idOrg) {
    return this.httpClient.get(this.url + "/countLevelByOrganization/" + idOrg);
  }
  countGroupByOrganizationAndLevelAndBranch(idOrg, idLevel, idBranch) {
    return this.httpClient.get(this.url + "/countGroupByOrganizationAndLevelAndBranch/" + idOrg+"/"+idLevel+"/"+idBranch);  
  }
  countOnlineUserByOrganization(idOrg){
    return this.httpClient.get(this.url + "/countOnlineUserByOrganization/" + idOrg);  
  }
}
