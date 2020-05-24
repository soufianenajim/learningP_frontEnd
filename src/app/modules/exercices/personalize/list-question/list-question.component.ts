import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatTable,
  Sort,
} from "@angular/material";
import { EditQuestionComponent } from "../edit-question/edit-question.component";
import { Question } from "../../../../core/models/question.model";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import clonedeep from "lodash.clonedeep";
import swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { DetailQuestionComponent } from "./detail/detail.component";
@Component({
  selector: "app-list-question",
  templateUrl: "./list-question.component.html",
  styleUrls: ["./list-question.component.css"],
})
export class ListQuestionComponent implements OnInit {
  @Input() questions: Question[] = [];
  @Output() changeQuestions = new EventEmitter<any>();
  @Output() changeNote = new EventEmitter<any>();
  @Output() invalidQuestion = new EventEmitter<boolean>();
  @ViewChild("list") list: CdkDropList;
  @ViewChild("table") table: MatTable<any>;
  @Input() isExam = false;
  displayedColumns: string[] = [ "name", "actions"];
  dataSource = new MatTableDataSource<Question>([]);
  mapQuestionNote = new Map();
  sum = 0;
  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    if (this.isExam) {
      this.displayedColumns = ["note", "indexNumerator", "name", "actions"];
    }
    if (this.questions != null) {
      for (let index = 0; index < this.questions.length; index++) {
        this.questions[index].index = index;
        this.mapQuestionNote.set(index, this.questions[index].note);
        this.sum += this.questions[index].note;
      }
      console.log("questions", this.questions);
      console.log("mapQuestionNote", this.mapQuestionNote);
      this.dataSource = new MatTableDataSource(this.questions);
    } else {
      this.questions = [];
    }
  }
  openDialogQuesiton(row) {
    let indexOf = -1;
    if (row !== null) {
      indexOf = this.questions.indexOf(row);
    }
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: "80%",
      data: row,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result: Question) => {
      console.log("this.questions", this.questions);
      const question = result;
      if (question !== null) {
        if (indexOf === -1) {
          result.indexNumerator =
            this.questions !== undefined ? this.questions.length + 1 : 1;
          result.note = 0;
          result.index =
            this.questions !== undefined ? this.questions.length : 0;
          this.questions.push(result);
          this.dataSource = new MatTableDataSource(this.questions);
        } else {
          console.log("question", question);
          this.questions.splice(indexOf, 1, question);
          this.dataSource = new MatTableDataSource(this.questions);
        }
        this.dataSource._updateChangeSubscription();
        this.changeQuestions.emit(this.questions);
      }
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // updates moved data and table, but not dynamic if more dropzones
    this.dataSource.data = clonedeep(this.dataSource.data);
  }
  onReCalculate(i) {
    const note = this.questions[i].note;
    if (this.mapQuestionNote.has(i)) {
      this.sum -= this.mapQuestionNote.get(i);
      this.mapQuestionNote.set(i, note);
    } else {
      this.mapQuestionNote.set(i, note);
    }

    this.sum += note;
    this.changeNote.emit(this.sum);
    let empty = false;
    for (let index = 0; index < this.questions.length; index++) {
      const element = this.questions[index];
      if (
        element.note === 0 ||
        element.note === null ||
        this.existingIndexQuestion(index)
      ) {
        empty = true;
      }
    }

    this.invalidQuestion.emit(empty);
  }
  isFieldRequiredInArrayNote(i) {
    return this.questions[i].note === null;
  }
  invalidDataInArrayNote(i) {
    const note = this.questions[i].note;
    return (
      note != null &&
      (this.questions[i].note < 0.25 || this.questions[i].note > 100)
    );
  }
  isFieldRequiredInArrayQuestion(i) {
    return this.questions[i].indexNumerator === null;
  }
  invalidDataInArrayQuestion(i) {
    const indexNumerator = this.questions[i].indexNumerator;
    return (
      indexNumerator != null &&
      (this.questions[i].indexNumerator < 1 ||
        this.questions[i].indexNumerator > this.getLenghtQuestions())
    );
  }
  existingIndexQuestion(i) {
    const indexNumerator = this.questions[i].indexNumerator;
    for (let index = 0; index < this.questions.length; index++) {
      if (
        index != i &&
        indexNumerator === this.questions[index].indexNumerator
      ) {
        return true;
      }
    }
    return false;
  }
  getLenghtQuestions() {
    return this.questions.length;
  }
  onChangeIndexQuestion(i) {
    let empty = false;
    for (let index = 0; index < this.questions.length; index++) {
      const element = this.questions[index];
      if (
        element.note === 0 ||
        element.note === null ||
        this.existingIndexQuestion(index) ||
        this.invalidDataInArrayQuestion(index)
      ) {
        empty = true;
      }
    }

    this.invalidQuestion.emit(empty);
  }
  sortData(sort: Sort) {
    const data = this.questions;
    if (!sort.active || sort.direction === "") {
      return;
    }

    this.questions.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "note":
          return this.compare(a.note, b.note, isAsc);
        case "name":
          return this.compare(a.name, b.name, isAsc);
        case "indexNumerator":
          return this.compare(a.indexNumerator, b.indexNumerator, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialogDelete(index) {
    let actionDeleted = this.getI18n("ACTION.DELETED");
    let userDeleted = this.getI18n("QUESTION.DELETED");
    swal({
      title: this.getI18n("QUESTION.DELETE"),
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
      .then(() => this.deleteQuestion(index))
      .then(function () {
        swal({
          title: actionDeleted,
          text: userDeleted,
          type: "success",
        });
      })
      .catch();
  }
  deleteQuestion(index) {
    console.log("index deleted", index);
    this.questions.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailQuestionComponent, {
      width: "80%",
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
}
