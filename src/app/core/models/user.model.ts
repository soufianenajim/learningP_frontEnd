import { Historized } from "./historized.model";

export class User extends Historized {
  constructor(
    public login?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public tokenDate?: string,
    public isOnline?: boolean,
    public isOffline?: boolean,
    public refRole?: any
  ) {
    super();
  }
}
