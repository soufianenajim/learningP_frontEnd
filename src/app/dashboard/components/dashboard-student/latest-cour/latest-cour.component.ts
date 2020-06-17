import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatTableDataSource, MatDialog, MatPaginator } from "@angular/material";
import { Cour } from "../../../../core/models/cour.model";
import { Demande } from "../../../../core/models/demande.model";
import { TokenStorageService } from "../../../../core/services/token_storage/token-storage.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ModuleService } from "../../../../core/services/module/module.service";
import { CourseService } from "../../../../core/services/course/course.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-latest-cour",
  templateUrl: "./latest-cour.component.html",
  styleUrls: ["./latest-cour.component.css"],
})
export class LatestCourComponent implements OnInit {
  displayedColumns: string[] = ["name", "module", "date"];

  dataSource: MatTableDataSource<Cour>;
  demandeCour: Demande<Cour> = new Demande<Cour>();

  cour: Cour = new Cour();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() student;
  resultsLength;

  listModule: any;
  lang;
  constructor(
    private courService: CourseService,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.lang=this.translate.getLangs()[0];
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang=event.lang;
      console.log('lang',this.lang)
      this.search(true);
    });
    this.search(false);
  
  }

  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    this.cour.student=this.student;
    this.demandeCour.model = this.cour;
    this.demandeCour.page = page;
    this.demandeCour.size = size;
    this.searchByCritere(this.demandeCour);
  }

  searchByCritere(demande: Demande<Cour>) {
    console.log("demande", demande);
    this.courService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("cours from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Cour>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }

  refreshDataTable() {
    this.search(true);
  }


}
