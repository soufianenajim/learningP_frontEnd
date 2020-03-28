import { Historized } from "./historized.model";

export class NoteExam extends Historized {
  constructor(
    public user?: any,
    public exam?: any,
    public score?: number,
  ) {
    super();
  }
}
