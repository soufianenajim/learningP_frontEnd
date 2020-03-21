import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare let d3: any;

@Component({
    selector: 'app-nvd3',
    templateUrl: './nvd3.component.html',
    styleUrls: ['../../../../node_modules/nvd3/build/nv.d3.css'],
    encapsulation: ViewEncapsulation.None
})
export class Nvd3Component implements OnInit {
    lineChartOptions: any;
    lineChartData: any;
    discreteBarOptions: any;
    discreteBarData: any;
    stackedMultiBarOptions: any;
    stackedMultiBarData: any;
    scatterOptions: any;
    scatterData: any;
    pieChartOption: any;
    pieChartData: any;
    donutChartOption: any;
    donutChartData: any;
    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.lineChartOptions = {
                chart: {
                    type: 'lineChart',
                    height: 400,
                    margin: {
                        top: 50,
                        left: 100
                    },
                    useInteractiveGuideline: true,
                    showLegend: true,
                    showYAxis: true,
                    showXAxis: true,
                    x: function (d) {
                        return d.x;
                    },
                    y: function (d) {
                        return d.y;
                    },
                    xAxis: {
                        axisLabel: 'Time (ms)',
                        tickFormat: function (d) {
                            return d3.format(',r')(d);
                        },
                    },
                    yAxis: {
                        axisLabel: 'Voltage (v)',
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        }
                    }
                }
            };
            this.lineChartData = this.sinAndCos();
            this.discreteBarOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 400,
                    x: function (d) {
                        return d.label;
                    },
                    y: function (d) {
                        return d.value;
                    },
                    staggerLabels: true,
                    showValues: true
                }
            };
            this.discreteBarData = [{
                key: 'Cumulative Return',
                values: [{
                    'label': 'A',
                    'value': -29.765957771107,
                    'color': '#FF9F55'
                }, {
                    'label': 'B',
                    'value': 10,
                    'color': '#FEC811'
                }, {
                    'label': 'C',
                    'value': 32.807804682612,
                    'color': '#4C5667'
                }, {
                    'label': 'D',
                    'value': 196.45946739256,
                    'color': '#01C0C8'
                }, {
                    'label': 'E',
                    'value': 0.25434030906893,
                    'color': '#FF0084'
                }, {
                    'label': 'F',
                    'value': -98.079782601442,
                    'color': '#007BB6'
                }, {
                    'label': 'G',
                    'value': -13.925743130903,
                    'color': '#3b5998'
                }, {
                    'label': 'H',
                    'value': -5.1387322875705,
                    'color': '#B2E0A2'
                }]
            }];
            this.stackedMultiBarOptions = {
                chart: {
                    type: 'multiBarChart',
                    height: 400,
                    reduceXTicks: true,
                    rotateLabels: 0,
                    showControls: true,
                    groupSpacing: 0.1,
                    xAxis: {
                        tickFormat: function (d) {
                            return d3.format(',f')(d);
                        }
                    },
                    yAxis: {
                        tickFormat: function (d) {
                            return d3.format(',.1f')(d);
                        }
                    }
                }
            }
            this.stackedMultiBarData = this.generateDataMultiBar();
            this.scatterOptions = {
                chart: {
                    type: 'scatterChart',
                    height: 400,
                    color: d3.scale.category10().range(),
                    showDistX: true,
                    showDistY: true,
                    xAxis: {
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        }
                    },
                    yAxis: {
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        }
                    }
                }
            };
            this.scatterData = randomData(4, 40);
            this.pieChartOption = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    x: function (d) {
                        return d.label;
                    },
                    y: function (d) {
                        return d.value;
                    },
                    showLabels: true
                }
            };
            this.pieChartData = pieData();
            this.donutChartOption = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    x: function (d) {
                        return d.label;
                    },
                    y: function (d) {
                        return d.value;
                    },
                    showLabels: true,
                    labelThreshold: 0.05,
                    labelType: 'percent',
                    donut: true,
                    donutRatio: 0.35
                }
            };
            this.donutChartData = pieData();
        }, 1);
    }

    sinAndCos() {
        const sin = [], sin2 = [], cos = [];

        for (let i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i / 10)});
            sin2.push({x: i, y: Math.sin(i / 10) * 0.25 + 0.5});
            cos.push({x: i, y: .5 * Math.cos(i / 10)});
        }

        return [
            {
                values: sin,
                key: 'Sine Wave',
                color: '#4C5667'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#5FBEAA'
            },
            {
                values: sin2,
                key: 'Another sine wave',
                color: '#FF9F55',
                area: true
            }
        ];
    }

    generateDataMultiBar() {
        return streamLayers(3, 50 + Math.random() * 50, .1).map(function (data, i) {
            return {
                key: 'Stream' + i,
                values: data
            };
        });
    }

}

function streamLayers(n, m, o) {
    if (arguments.length < 3) {
        o = 0;
    }

    function bump(a) {
        const x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
        for (let i = 0; i < m; i++) {
            const w = (i / m - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }

    return d3.range(n).map(function () {
        const a = [];
        let i;
        for (i = 0; i < m; i++) {
            a[i] = o + o * Math.random();
        }
        for (i = 0; i < 5; i++) {
            bump(a)
        }
        ;
        return a.map(streamIndex);
    });
}

function streamIndex(d, i) {
    return {x: i, y: Math.max(0, d)};
}

function randomData(groups, points) {
    const data = [],
        shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
        random = d3.random.normal();

    for (let i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (let j = 0; j < points; j++) {
            data[i].values.push({
                x: random(),
                y: random(),
                size: Math.random(),
                shape: (Math.random() > 0.95) ? shapes[j % 6] : 'circle'
            });
        }
    }

    return data;
}

function pieData() {
    return [{
        'label': 'One',
        'value': 29.765957771107,
        'color': '#FB9678'
    }, {
        'label': 'Two',
        'value': 0,
        'color': '#FF9F55'
    }, {
        'label': 'Three',
        'value': 32.807804682612,
        'color': '#01C0C8'
    }, {
        'label': 'Four',
        'value': 196.45946739256,
        'color': '#00C292'
    }, {
        'label': 'Five',
        'value': 0.19434030906893,
        'color': '#4F5467'
    }, {
        'label': 'Six',
        'value': 98.079782601442,
        'color': '#4F5467'
    }, {
        'label': 'Seven',
        'value': 13.925743130903,
        'color': '#000000'
    }, {
        'label': 'Eight',
        'value': 5.1387322875705,
        'color': '#CB2027'
    }];
}
