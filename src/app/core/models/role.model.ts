import { Historized } from "./historized.model";

export class Role extends Historized {
  constructor(public name?: string) {
    super();
  }
}
