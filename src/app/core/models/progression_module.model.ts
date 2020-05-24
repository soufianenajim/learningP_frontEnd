import { Historized } from "./historized.model";
import { User } from "./user.model";
import { Module } from "./module.model";

export class ProgressionModule extends Historized {
  constructor(
    public student?: User,
    public module?: Module,
    public progressionCour?: number,
    public progressionExamQuiz?:number,
    public noteFinal?: number,
    public teacher?:boolean
  
  ) {
    super();
  }
}
