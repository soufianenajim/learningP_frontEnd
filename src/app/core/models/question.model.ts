import { Historized } from "./historized.model";

export class Question extends Historized {
  constructor(
    public name?: string,
    public code?: string,
    public correctComment?: string,
    public td?: any,
    public quiz?: any,
    public exam?: any,
    public suggestions?: any[]
  ) {
    super();
  }
}
