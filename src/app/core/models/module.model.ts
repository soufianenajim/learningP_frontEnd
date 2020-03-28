import { Historized } from "./historized.model";

export class Module extends Historized {
  constructor(
    public name?: string,
    public user?: any,
    public cours?: any[],
    public exams?: any[]
  ) {
    super();
  }
}
