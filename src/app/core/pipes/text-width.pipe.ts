import { PipeTransform, Pipe } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';

@Pipe({ name: 'textWidth' })
export class TextWidthPipe implements PipeTransform {

    constructor(private sharedService: SharedService) { }

    transform(value: string, textWidth?: number): string {
        return this.getName(value, textWidth);
    }

    getName(row, numberCharacters) {
        const name = this.sharedService.getName(row, numberCharacters);
        return name;
    }

}
