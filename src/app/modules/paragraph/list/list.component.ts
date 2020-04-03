import { Component, OnInit, ViewChild } from "@angular/core";
import { Paragraphe } from "../../../core/models/paragraphe.model";
import { Demande } from "../../../core/models/demande.model";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { ParagraphService } from "../../../core/services/paragraph/paragraph.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { ChapterService } from "../../../core/services/chapter/chapter.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "chapitre", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Paragraphe>;

  demandeParagraphe: Demande<Paragraphe> = new Demande<Paragraphe>();

  paragraphe: Paragraphe = new Paragraphe();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listChapitre;
  paragraphForm = new FormGroup({
    name: new FormControl(""),
    chapitre: new FormControl()
  });
  constructor(
    private chapitreService: ChapterService,
    private paragrapheService: ParagraphService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.chapitreService.findAll().subscribe(resp => {
      console.log("list chapitr --------", resp);
      this.listChapitre = resp;
     this.search(false);
    });
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.paragraphForm.get("name").value;
    const chapitre = this.paragraphForm.get("chapitre").value;

    this.paragraphe.name = name;
    this.paragraphe.chapitre = chapitre;
    this.demandeParagraphe.model = this.paragraphe;
    this.demandeParagraphe.page = page;
    this.demandeParagraphe.size = size;

    this.searchByCritere(this.demandeParagraphe);
  }

  searchByCritere(demande: Demande<Paragraphe>) {
    console.log("demandeParagraphe --------", demande);
    this.paragrapheService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("paragraphes from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Paragraphe>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.paragraphForm.get("name").setValue("");
    this.paragraphForm.get("chapitre").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.paragrapheService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
}
