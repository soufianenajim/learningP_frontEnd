import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
import { Td } from "../../../core/models/td.model";
import { TdService } from "../../../core/services/td/td.service";

@Component({
  selector: "app-save-or-update",
  templateUrl: "./save-or-update.component.html",
  styleUrls: ["./save-or-update.component.css"]
})
export class SaveOrUpdateComponent implements OnInit {
  tdForm = new FormGroup({
    name: new FormControl(""),
    cour: new FormControl()
  });
  listCour: any;
  constructor(
    private courseService: CourseService,
    private tdService: TdService
  ) {}

  ngOnInit() {
    this.courseService.findAll().subscribe(res => {
      console.log("res", res);
      this.listCour = res;
    });
  }
  save() {
    const name = this.tdForm.get("name").value;
    const cour = this.tdForm.get("cour").value;
    let td = new Td();
    td.name = name;
    td.cour = cour;
    this.tdService.saveOrUpdate(td).subscribe(resp => {
      console.log("response  ----", resp);
    });
  }
}
