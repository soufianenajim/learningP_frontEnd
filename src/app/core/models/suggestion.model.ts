import { Historized } from "./historized.model";

export class Suggestion extends Historized {
  constructor(
    public name?: string,
    public correct?: boolean,
    public question?: any
  ) {
    super();
  }
}
