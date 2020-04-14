import { Historized } from "./historized.model";

export class Cour extends Historized{

    constructor(
        
        public name?: string,
        public module?: any,
        public introduction?:string,
        public resume?:string,
        public conclusion?:string,
        public quiz?: any[]
    ) {
        super();
    }

    
}
