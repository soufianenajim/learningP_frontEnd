import { Historized } from "./historized.model";

export class Paragraphe extends Historized {
  constructor(
    public name?: string,
    public content?: string,
    public chapitre?: any
  ) {
    super();
  }
}
