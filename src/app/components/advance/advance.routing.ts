import {Routes} from "@angular/router";
import {ModalComponent} from "./modal/modal.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {NotifyComponent} from "./notify/notify.component";

export const AdvanceRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Advance Components',
            status: false
        },
        children: [
            {
                path: 'modal',
                component: ModalComponent,
                data: {
                    breadcrumb: 'Modal',
                    status: true
                }
            }, {
                path: 'notifications',
                component: NotificationsComponent,
                data: {
                    breadcrumb: 'Notifications',
                    status: true
                }
            }, {
                path: 'notify',
                component: NotifyComponent,
                data: {
                    breadcrumb: 'PNOTIFY',
                    status: true
                }
            }
        ]
    }
]