import { Historized } from "./historized.model";

export class Cour extends Historized{

    constructor(
        
        public name?: string,
        public module?: any,
        public chapitres?: any[],
        public quiz?: any[]
    ) {
        super();
    }

    
}
