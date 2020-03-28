import { Historized } from "./historized.model";

export class Exam extends Historized {
  constructor(
    public name?: string,
    public module?: any,
    public questions?: any[]
  ) {
    super();
  }
}
