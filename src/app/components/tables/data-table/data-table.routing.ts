import {Routes} from "@angular/router";
import {BasicComponent} from "./basic/basic.component";
import {InlineEditComponent} from "./inline-edit/inline-edit.component";
import {ChildRowComponent} from "./child-row/child-row.component";
import {PagingComponent} from "./paging/paging.component";
import {SelectionComponent} from "./selection/selection.component";
import {OtherComponent} from "./other/other.component";

export const DataTableRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Data Tables',
            status: false
        },
        children: [
            {
                path: 'basic',
                component: BasicComponent,
                data: {
                    breadcrumb: 'Basic Table',
                    status: true
                }
            }, {
                path: 'editable',
                component: InlineEditComponent,
                data: {
                    breadcrumb: 'Editable',
                    status: true
                }
            }, {
                path: 'row-details',
                component: ChildRowComponent,
                data: {
                    breadcrumb: 'Row Details',
                    status: true
                }
            }, {
                path: 'paging',
                component: PagingComponent,
                data: {
                    breadcrumb: 'Table Paging',
                    status: true
                }
            }, {
                path: 'selection',
                component: SelectionComponent,
                data: {
                    breadcrumb: 'Selection Table',
                    status: true
                }
            }, {
                path: 'other',
                component: OtherComponent,
                data: {
                    breadcrumb: 'Other',
                    status: true
                }
            }
        ]
    }
]