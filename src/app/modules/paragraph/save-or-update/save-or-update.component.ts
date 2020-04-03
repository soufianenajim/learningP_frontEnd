import { Component, OnInit, Inject } from "@angular/core";
import { Paragraphe } from "../../../core/models/paragraphe.model";
import { FormGroup, FormControl } from "@angular/forms";
import { ParagraphService } from "../../../core/services/paragraph/paragraph.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ChapterService } from "../../../core/services/chapter/chapter.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"]
})
export class SaveOrUpdateComponent implements OnInit {
  listChapitre: any;
  paragrapheForm = new FormGroup({
    name: new FormControl(""),
    content: new FormControl(""),
    chapitre: new FormControl()
  });

  idParagraphe = null;
  isEdit = false;
  constructor(
    private paragrapheService: ParagraphService,
    private chapitreService: ChapterService,
    public dialogRef: MatDialogRef<SaveOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data !== null) {
      this.isEdit = true;
      this.idParagraphe = data.id;
      const name = data.name;
      const content = data.content;
      const chapitre =data.chapitre;
      this.paragrapheForm.get("name").setValue(name);
      this.paragrapheForm.get("content").setValue(content);
      this.paragrapheForm.get("chapitre").setValue(chapitre);
    }
  }

  ngOnInit() {
    this.chapitreService.findAll().subscribe(res => {
      console.log("res", res);
      this.listChapitre = res;
    });
  }
  save() {
    const name = this.paragrapheForm.get("name").value;
    const content = this.paragrapheForm.get("content").value;
    const chapitre = this.paragrapheForm.get("chapitre").value;
    let paragraphe = new Paragraphe();
    paragraphe.id = this.idParagraphe;
    paragraphe.name = name;
    paragraphe.content = content;
    paragraphe.chapitre = chapitre;
    this.paragrapheService.saveOrUpdate(paragraphe).subscribe(resp => {
      console.log("response  ----", resp);
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  compareParagraphe(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
