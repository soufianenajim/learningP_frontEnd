import { Historized } from "./historized.model";

export class Organization extends Historized {
  constructor(
    public name?: string,
  ) {
    super();
  }
}
