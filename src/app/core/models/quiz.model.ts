import { Historized } from "./historized.model";

export class Quiz extends Historized {
  constructor(
    public name?: string,
    
    public questions?: any[]
  ) {
    super();
  }
}
