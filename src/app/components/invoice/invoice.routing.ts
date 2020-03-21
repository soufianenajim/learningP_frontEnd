import {Routes} from "@angular/router";
import {BasicComponent} from "./basic/basic.component";
import {SummaryComponent} from "./summary/summary.component";
import {ListComponent} from "./list/list.component";

export const InvoiceRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Invoice',
            status: false
        },
        children: [
            {
                path: 'basic',
                component: BasicComponent,
                data: {
                    breadcrumb: 'Invoice',
                    status: true
                }
            },{
                path: 'summary',
                component: SummaryComponent,
                data: {
                    breadcrumb: 'Invoice Summary',
                    status: true
                }
            },{
                path: 'list',
                component: ListComponent,
                data: {
                    breadcrumb: 'Invoice List',
                    status: true
                }
            }
        ]
    }
]
