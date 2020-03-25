import { Component, OnInit } from "@angular/core";
import { TdService } from "../../../core/services/td/td.service";
import { Td } from "../../../core/models/td.model";
import { Cour } from "../../../core/models/cour.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  constructor(private tdService: TdService) {}

  ngOnInit() {
    // let td = new Td();
    // let cour=new Cour();
    // cour.id=1;
    // cour.name="cour jalit1515";
    // td.name = "Td name25";
    // td.cour=cour;
    // console.log("td", td);
    // this.tdService.saveOrUpdate(td).subscribe(resp => {
    //   console.log("resp--------------------", resp);
    // });
  }
}
