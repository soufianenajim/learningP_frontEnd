import { Historized } from "./historized.model";
import { User } from "./user.model";
import { Module } from "./module.model";

export class ProgressionModule extends Historized {
  constructor(
    public student?: User,
    public module?: Module,
    public progressionCour?: number,
    public progressionQuiz?: number,
    public progressionExam?: number,
    public noteFinal?: number,
  
  ) {
    super();
  }
}
