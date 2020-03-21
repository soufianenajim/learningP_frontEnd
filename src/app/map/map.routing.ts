import {Routes} from "@angular/router";
import {GoogleComponent} from "./google/google.component";
import {VectorComponent} from "./vector/vector.component";

export const MapRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Map',
            status: false
        },
        children: [
            {
                path: 'google',
                component: GoogleComponent,
                data: {
                    breadcrumb: 'Google Map',
                    status: true
                }
            }, {
                path: 'vector',
                component: VectorComponent,
                data: {
                    breadcrumb: 'Vector Map',
                    status: true
                }
            }
        ]
    }
]