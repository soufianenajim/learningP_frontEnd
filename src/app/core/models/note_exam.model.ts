import { Historized } from "./historized.model";

export class NoteExam extends Historized {
  constructor(
    public user?: any,
    public exam?: any,
    public score?: number,
    public finished?:boolean,
    public showScore?:boolean,
    public module?:any,
    public type?:string,
    public answers?:any[]
  ) {
    super();
  }
}
