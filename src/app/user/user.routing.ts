import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {CardComponent} from "./card/card.component";

export const UserRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'User Profile',
            status: false
        },
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    breadcrumb: 'User Profile',
                    status: true
                }
            },{
                path: 'card',
                component: CardComponent,
                data: {
                    breadcrumb: 'User Card',
                    status: true
                }
            }
        ]
    }
]