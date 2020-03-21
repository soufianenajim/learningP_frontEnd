import {Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {BoardComponent} from "./board/board.component";
import {DetailsComponent} from "./details/details.component";
import {IssueComponent} from "./issue/issue.component";

export const TaskRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Task',
            status: false
        },
        children: [
            {
                path: 'list',
                component: ListComponent,
                data: {
                    breadcrumb: 'Task List',
                    status: true
                }
            },{
                path: 'board',
                component: BoardComponent,
                data: {
                    breadcrumb: 'Task Board',
                    status: true
                }
            },{
                path: 'details',
                component: DetailsComponent,
                data: {
                    breadcrumb: 'Task Details',
                    status: true
                }
            },{
                path: 'issue',
                component: IssueComponent,
                data: {
                    breadcrumb: 'Task Issue',
                    status: true
                }
            }
        ]
    }
]