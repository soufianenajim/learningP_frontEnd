export enum SortOrder {

    ASCENDING,
    DESCENDING,
    NONE
}

export class Demande<T> {
    model: T;
    page: number;
    size: number;
    sortField: string;
    sortFieldSecond: String;
    sortOrder: SortOrder;
 

    setSortOrder(sort: string): void {
        switch (sort) {
            case 'asc':
                this.sortOrder = SortOrder.ASCENDING;
                break;
            case 'desc':
                this.sortOrder = SortOrder.DESCENDING;
                break;
            default:
                this.sortOrder = SortOrder.NONE;
                break;
        }
    }

}
