import { Component, OnInit, Input } from "@angular/core";
import { Suggestion } from "../../../../../core/models/suggestion.model";
import { Question } from "../../../../../core/models/question.model";

@Component({
  selector: "app-td-or-quiz",
  templateUrl: "./td-or-quiz.component.html",
  styleUrls: ["./td-or-quiz.component.css"],
})
export class TdOrQuizComponent implements OnInit {
  @Input() tdOrQuiz;
  @Input() questionCorrectSuggestions;
  @Input() questionCorrect;
  @Input() isPastTdorQuiz;
  constructor() {}

  ngOnInit() {
    console.log("tdOrQuiz", this.tdOrQuiz);
    console.log("questionCorrect", this.questionCorrect);
  }
  addToCorrect(suggestion, question) {
    if (this.questionCorrectSuggestions.has(question)) {
      let suggestions: Suggestion[] = this.questionCorrectSuggestions.get(
        question
      );
      suggestions.push(suggestion);
    } else {
      let suggestions = [];
      suggestions.push(suggestion);
      this.questionCorrectSuggestions.set(question, suggestions);
    }
  }
  deleteFromCorrect(suggestion, question) {
    if (this.questionCorrectSuggestions.has(question)) {
      let suggestions: Suggestion[] = this.questionCorrectSuggestions.get(
        question
      );
      const index = suggestions.indexOf(suggestion);
      if (index > -1) {
        suggestions.splice(index, 1);
      }
    }
  }

  isCorrect(question) {
    return this.questionCorrect.indexOf(question) > -1;
  }
}
