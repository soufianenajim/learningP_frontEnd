import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Question } from '../../../../core/models/question.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TokenStorageService } from '../../../../core/services/token_storage/token-storage.service';
import { SuggestionService } from '../../../../core/services/suggestion/suggestion.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  questionForm: FormGroup;

  isEdit = false;
  question=new Question();
  listModule = [];
  listExam = [];
  listQuiz = [];
  listTd = [];
  isExam = false;
  isQuiz = false;
  isTd = false;
  alphabet="A";
  isClickSave=false;
  constructor(
    private suggestionService: SuggestionService,
    private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<EditQuestionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
   
    this.questionForm = this.fb.group({
      name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
      code: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
      correctComment: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
      suggestions: this.fb.array([],[Validators.required,this.minLengthArray(2)]),
    });
    if (data !== null) {
      this.isEdit = true;
     
      this.buildForm(data);
    }
  }
  buildForm(data) {
    console.log('data',data);
    this.questionForm.get("name").setValue(data.name);
    this.questionForm.get("code").setValue(data.code);
    this.questionForm.get("correctComment").setValue(data.correctComment);
    this.question = data;
    this.question.id = data.id;
    this.question.note=data.note
    this.question.indexNumerator=data.indexNumerator;
   
     
   
    
   
    let suggestions = data.suggestions;
    if (suggestions) {
      for (let d of data.suggestions) {
        const index=d.name.substring(0,3);
        this.suggestions.push(
          this.fb.group({
            id: new FormControl(d.id),
            name: new FormControl(d.name.substring(3,d.name.lenght),[Validators.required,this.noWhitespaceValidator]),
            correct: new FormControl(d.correct),
          })
        );
      }
    }
  
  }
  ngOnInit() {
    
  }
  save() {
    this.isClickSave=true;
    const name = this.questionForm.get("name").value;
    const code = this.questionForm.get("code").value;
    const correctComment = this.questionForm.get("correctComment").value;
    const suggestions :any[] = this.questionForm.get("suggestions").value;
    for (let index = 0; index < suggestions.length; index++) {
      suggestions[index].name =this.getAlphabet(index).concat(suggestions[index].name);
    }
    
   
    this.question.name = name;
    this.question.code = code;
    this.question.correctComment = correctComment;
   this.question.suggestions = suggestions;
    if(this.questionForm.valid && !this.isRedondantAllField()&& this.errorMinCorrect()){
         this.dialogRef.close(this.question);
  }
  }
  cancel() {
    this.dialogRef.close(null);
  }
  compareQuestion(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public get suggestions(): FormArray {
    return this.questionForm.get("suggestions") as FormArray;
  }

  newSuggestion(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      name: new FormControl("",[Validators.required,this.noWhitespaceValidator]),
      correct: new FormControl(false),
    });
  }

  addSuggestions() {
    this.suggestions.push(this.newSuggestion());
  }
getAlphabet(i){
 return String.fromCharCode(97 + i).toUpperCase().concat(' - ');
}  

  removeSuggestion(i: number) {

    if (this.isEdit) {
      const id = this.suggestions.at(i).value.id;
      if (id != null) {
        this.suggestionService.delete(id).subscribe((resp) => {
          this.suggestions.removeAt(i);
        });
      } else {
        this.suggestions.removeAt(i);
      }
    } else {
      this.suggestions.removeAt(i);
    }
  }

  onSubmit() {
  }
  compareModule(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  errormptyField(field: string) {
    return (
      this.questionForm.get(field).hasError("required") &&
      (this.questionForm.get(field).touched || this.isClickSave)
    );
  }
  errorMinLenght(){
   return this.questionForm.get('suggestions').hasError('minLengthArray')&&this.isClickSave;
  }
  errorEmptySuggestion(){
    return this.suggestions.value.length===0 &&this.isClickSave
  }
  invalidData(field: string) {
    return (
      this.questionForm.get(field).hasError("whitespace") &&
      !this.questionForm.get(field).hasError("required") &&
      (this.questionForm.get(field).touched || this.isClickSave)
    );
  }
  isFieldRequiredInArray(field: string, index: number) {
    return this.suggestions.at(index).get(field).hasError('required')
      && (this.suggestions.at(index).get(field).touched || this.isClickSave);
  }
  invalidDataInArraY(field: string, index: number) {
   
    return  (
      this.suggestions.at(index).get(field).hasError("whitespace") &&
      !this.suggestions.at(index).get(field).hasError("required") &&
      (this.suggestions.at(index).get(field).touched || this.isClickSave)
    );
  }

 
  
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
}
isRedondantField(index: number) {
  const value = this.suggestions.at(index).value.name;
  console.log('value',value);
  for (let i = 0; i < this.suggestions.value.length; i++) {
    if (i !== index && this.suggestions.at(i).value.name === value && this.suggestions.at(i).value.name !== '') {
      return true;
    }
  }
  return false;
}
isRedondantAllField() {
  for (let j = 0; j < this.suggestions.value.length; j++) {
    if (this.isRedondantField(j)) {
      return true;
    }
  }
  return false;
}

errorMinCorrect(){
  console.log('errorMinCorrect')
  let isCorrect=false;
  for (let j = 0; j < this.suggestions.value.length; j++) {
    if(this.suggestions.at(j).value.correct)
    isCorrect =true;
  }
  console.log('isCorrect',isCorrect)
  return isCorrect ;
}
}
