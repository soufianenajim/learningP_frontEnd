import {Routes} from '@angular/router';
import {GoogleComponent} from './google/google.component';
import {EchartComponent} from './echart/echart.component';
import {ChartJsComponent} from './chart-js/chart-js.component';
import {KnobComponent} from './knob/knob.component';
import {ListChartComponent} from './list-chart/list-chart.component';
import {MorrisJsComponent} from './morris-js/morris-js.component';
import {Nvd3Component} from './nvd3/nvd3.component';
import {PeityComponent} from './peity/peity.component';
import {RadialComponent} from './radial/radial.component';
import {SparklinesComponent} from './sparklines/sparklines.component';
import {C3JsComponent} from './c3-js/c3-js.component';

export const ChartRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Chart',
            status: false
        },
        children: [
            {
                path: 'google',
                component: GoogleComponent,
                data: {
                    breadcrumb: 'Google Chart',
                    status: true
                }
            }, {
                path: 'echart',
                component: EchartComponent,
                data: {
                    breadcrumb: 'E-Chart Chart',
                    status: true
                }
            }, {
                path: 'chart-js',
                component: ChartJsComponent,
                data: {
                    breadcrumb: 'ChartJS Chart',
                    status: true
                }
            }, {
                path: 'knob',
                component: KnobComponent,
                data: {
                    breadcrumb: 'Knob Chart',
                    status: true
                }
            }, {
                path: 'list-chart',
                component: ListChartComponent,
                data: {
                    breadcrumb: 'List Chart',
                    status: true
                }
            }, {
                path: 'morris-js',
                component: MorrisJsComponent,
                data: {
                    breadcrumb: 'MorrisJS Chart',
                    status: true
                }
            }, {
                path: 'nvd3',
                component: Nvd3Component,
                data: {
                    breadcrumb: 'NVD3 Chart',
                    status: true
                }
            }, {
                path: 'peity',
                component: PeityComponent,
                data: {
                    breadcrumb: 'Peity Chart',
                    status: true
                }
            }, {
                path: 'radial',
                component: RadialComponent,
                data: {
                    breadcrumb: 'Radial Chart',
                    status: true
                }
            }, {
                path: 'sparklines',
                component: SparklinesComponent,
                data: {
                    breadcrumb: 'Sparklines Chart',
                    status: true
                }
            }, {
                path: 'c3-js',
                component: C3JsComponent,
                data: {
                    breadcrumb: 'C3 Chart',
                    status: true
                }
            }
        ]
    }
]
