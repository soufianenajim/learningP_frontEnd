import {
  EventEmitter,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  SkipSelf,
  AfterViewChecked,
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { Question } from "../../../core/models/question.model";
import { Demande } from "../../../core/models/demande.model";
import { FormGroup, FormControl } from "@angular/forms";
import { QuestionService } from "../../../core/services/question/question.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { SelectionModel } from "@angular/cdk/collections";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-question-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ["name", "code", "correctComment", "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Question>;

  demandeQuestion: Demande<Question> = new Demande<Question>();

  question: Question = new Question();
  resultsLength;
  @Input() isFromParent = false;
  @Input() questionsParent;
  @Output() questionSelect = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listChapitre;
  questionForm = new FormGroup({
    name: new FormControl(""),
    code: new FormControl(""),
  });
  selection = new SelectionModel<any>(true, []);
  checkedInit=true;
  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private translateService:TranslateService
  ) {}
  ngOnInit() {
    console.log("isFromParent", this.isFromParent);
    if (this.isFromParent) {
      this.displayedColumns = ["select", "name", "code", "correctComment"];
    }
    this.search(false);
  }
  ngAfterViewChecked() {
    if (this.questionsParent && this.checkedInit) {
      this.checkedInit=false;
      for (let question of this.questionsParent) {
        this.checked(question)
      }
    }
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.questionForm.get("name").value;
    const code = this.questionForm.get("code").value;

    this.question.name = name;
    this.question.code = code;

    this.demandeQuestion.model = this.question;
    this.demandeQuestion.page = page;
    this.demandeQuestion.size = size;

    this.searchByCritere(this.demandeQuestion);
  }

  searchByCritere(demande: Demande<Question>) {
    console.log("demandeQuestion --------", demande);
    this.questionService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("questions from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Question>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    console.log("this.selction", this.selection.selected);
    // this.questionForm.get("name").setValue("");
    // this.questionForm.get("code").setValue("");
    // this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "80%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.questionService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }
  checked(row: any) {
    this.selection.select(row);
    var found = this.selection.selected.find((x) => x.id == row.id);
    if (found) found.checked = true;
    this.questionSelect.emit(this.selection.selected);
  }
  unChecked(row: any) {
    var found = this.selection.selected.find((x) => x.id == row.id);
    if (found) found.checked = false;
    this.selection.deselect(found);
    this.questionSelect.emit(this.selection.selected);
  }
  isChecked(row: any) {
    var found = this.selection.selected.find((x) => x.id == row.id);
    if (found) return found.checked;
  }
  getRoleName(role: String) {
    const rolei18 = role.replace("ROLE_", "ROLE.");
    let roleName;
    this.translateService.get(rolei18).subscribe((value: string) => {
        roleName = value;
        return value
    });
    return roleName;
}
}
