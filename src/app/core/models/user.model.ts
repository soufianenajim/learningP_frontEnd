import { Historized } from "./historized.model";

export class User extends Historized {
  constructor(
    public email?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public phone?:string,
    public token?: string,
    public tokenDate?: string,
    public isOnline?: boolean,
    public isOffline?: boolean,
    public refRole?: any,
    public organization?: any,
    public branch?: any,
    public level?: any

  ) {
    super();
  }
}
