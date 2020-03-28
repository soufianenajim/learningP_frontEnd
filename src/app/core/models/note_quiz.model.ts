import { Historized } from "./historized.model";

export class NoteExamDTO extends Historized {
  constructor(
    public user?: any,
    public quiz?: any,
    public score?: number,
  ) {
    super();
  }
}
