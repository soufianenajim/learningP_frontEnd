import { Historized } from "./historized.model";

export class Chapitre extends Historized {
  constructor(
    public name?: string,
    public cour?: any,
    public paragraphes?: any[]
  ) {
    super();
  }
}
