import {Routes} from "@angular/router";
import {BasicComponent} from "./basic/basic.component";
import {SizingComponent} from "./sizing/sizing.component";
import {BorderComponent} from "./border/border.component";
import {StylingComponent} from "./styling/styling.component";

export const BootstrapTableRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Tables',
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
                path: 'sizing',
                component: SizingComponent,
                data: {
                    breadcrumb: 'Sizing Table',
                    status: true
                }
            }, {
                path: 'border',
                component: BorderComponent,
                data: {
                    breadcrumb: 'Border Table',
                    status: true
                }
            }, {
                path: 'styling',
                component: StylingComponent,
                data: {
                    breadcrumb: 'Styling Table',
                    status: true
                }
            }
        ]
    }
]