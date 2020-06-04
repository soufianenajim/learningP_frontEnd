import { Component, OnInit, Inject } from "@angular/core";
import { CourseService } from "../../../core/services/course/course.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { Cour } from "../../../core/models/cour.model";
import { QuizService } from "../../../core/services/quiz/quiz.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { Dropbox } from "dropbox";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";
export class AttachmentFile {
  fileName: String;
  attachmentPath: String;
  uri: String;
  constructor(file: String, attachment: String, uri: String) {
    this.fileName = file;
    this.attachmentPath = attachment;
    this.uri = uri;
  }
}
@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"],
})
export class SaveOrUpdateComponent implements OnInit {
  courForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(null),
    content: new FormControl(""),
  });
  listModule: any;
  listQuiz: any;
  idCour = null;
  isEdit = false;
  selectedFiles: FileList[] = [];
  progressInfos = [];
  files: File[] = [];
  message = "";
  namePath;
  attachmentPath;
  listAttachment: AttachmentFile[] = [];
  fileInfos: Observable<any>;
  url = environment.baseUrl + "/cour";
  constructor(
    private courseService: CourseService,
    private moduleService: ModuleService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenStorageService: TokenStorageService,
    private translate: TranslateService
  ) {
    if (data !== null) {
      console.log("data", data);
      this.isEdit = true;
      this.idCour = data.id;
      const name = data.name;
      const module = data.module;
      const content = data.content;
      //this.listAttachment = data.attachmentFiles;
      if (data.attachmentFiles) {
        console.log("data.attachmentFiles", data.attachmentFiles);
        for (let attachment of data.attachmentFiles) {
          let uri =
            this.url + "/load/" + this.idCour + "/" + attachment.fileName;
          this.listAttachment.push(
            new AttachmentFile(
              attachment.fileName,
              attachment.attachmentPath,
              uri
            )
          );
        }
      }
      // this.namePath=data.fileName;
      // this.attachmentPath='http://localhost:8081/learning_backEnd/api/cour/load/'+data.id;
      this.courForm.get("name").setValue(name);
      this.courForm.get("module").setValue(module);
      this.courForm.get("content").setValue(content);
      this.onSelectModule();
    }
  }

  ngOnInit() {
    this.fileInfos = this.courseService.getFiles();
    console.log("fileInfos", this.fileInfos);
    const user = this.tokenStorageService.getUser();
    this.moduleService.findByProfessor(user.id).subscribe((res) => {
      console.log("res", res);
      this.listModule = res;
    });
  }
  buildFile() {
    for (const iterator of this.selectedFiles) {
      this.files.push(iterator[0]);
    }
  }
  save() {
    this.buildFile();
    console.log("files", this.files);
    const name = this.courForm.get("name").value;
    const module = this.courForm.get("module").value;
    const content = this.courForm.get("content").value;

    let cour = new Cour();
    cour.id = this.idCour;
    cour.name = name;
    cour.module = module;
    cour.content = content;
    this.courseService.saveOrUpdate(cour, this.files).subscribe((resp) => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareQuiz(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  onSelectModule() {}

  selectFiles(event) {
    this.selectedFiles.push(event.target.files);
    console.log("selectedFiles", this.selectedFiles);
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.courseService.upload(file).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.courseService.getFiles();
        }
      },
      (err) => {
        this.progressInfos[idx].value = 0;
        this.message = "Could not upload the file:" + file.name;
      }
    );
  }

  loadAttachment(nameFile) {
    return this.courseService
      .loadAttachment(this.idCour, nameFile)
      .subscribe((resp) => {});
  }
  deleteFile(attachment) {
    var index = this.selectedFiles.indexOf(attachment);
    this.selectedFiles.splice(index, 1);
  }
  openDialogDelete(attachment) {
    let actionDeleted = this.getI18n("ACTION.DELETED");
    let userDeleted = this.getI18n("COURSE.ATTACHMENT.DELETED");
    swal({
      title: this.getI18n("COURSE.ATTACHMENT.DELETE"),
      text: this.getI18n("ACTION.CONFIRMATION_MESSAGE"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getI18n("ACTION.CONFIRMATION"),
      cancelButtonText: this.getI18n("ACTION.CANCEL_CONFIRMATION"),
      reverseButtons: false,
      focusCancel: true,
    })
      .then(() => this.deleteAttachment(attachment, this.idCour))
      .then(function () {
        swal({
          title: actionDeleted,
          text: userDeleted,
          type: "success",
        });
      })
      .catch();
  }
  getI18n(name): string {
    let i18;
    this.translate.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
  deleteAttachment(attachment, idCour) {
    this.courseService
      .deleteAttachment(idCour, attachment.fileName)
      .subscribe((resp) => {
       this.deleteFromFileAttachment(attachment);
      });

  }
  deleteFromFileAttachment(attachment){
    let index=this.listAttachment.indexOf(attachment);
    this.listAttachment.splice(index,1);
  }
}
