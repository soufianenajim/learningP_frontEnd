import { Historized } from "./historized.model";
import { User } from "./user.model";
import { Cour } from "./cour.model";

export class ProgressionCour extends Historized {
  constructor(
    public student?: User,
    public cour?: Cour,
    public courFinished?: boolean,
    public tdFinished?: boolean,
    public quizFinished?:boolean,
    public scoreQuiz?:number,
    public progression?: number,
    public moduleId?:number
  ) {
    super();
  }
}
