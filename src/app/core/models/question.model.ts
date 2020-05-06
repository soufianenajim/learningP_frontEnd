import { Historized } from "./historized.model";

export class Question extends Historized {
  constructor(
    public name?: string,
    public code?: string,
    public correctComment?: string,
    public indexNumerator?:number,
    public exercices?: any,
    public exam?: any,
    public suggestions?: any[]
  ) {
    super();
  }
}
