import { Historized } from "./historized.model";

export class Quiz extends Historized {
  constructor(
    public name?: string,
    public module?: any,
    public questions?: any[]
  ) {
    super();
  }
}
