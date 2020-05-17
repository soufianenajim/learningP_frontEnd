
export class Notifications {
    nameParent: string;
    nameChild: string;
    dateNotif: Date;

    constructor(nameP, nameC, dateN){
        this.nameParent = nameP;
        this.nameChild = nameC;
        this.dateNotif = dateN;
    }
  }