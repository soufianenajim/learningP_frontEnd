'use strict';
$(document).ready(function() {

    $(document).ready(function() {
        areaChart();
    });

    /*Area chart*/
    function areaChart() {
        window.areaChart = Morris.Area({
            element: 'last-activity',
            data: [{
                y: '2006',
                a: 10
            },
            {
                y: '2007',
                a: 65
            },
            {
                y: '2008',
                a: 25
            },
            {
                y: '2009',
                a: 25
            },
            {
                y: '2010',
                a: 60
            },
            {
                y: '2011',
                a: 20
            },
            ],
            xkey: 'y',
            resize: true,
            hideHover: true,
            redraw: true,
            ykeys: ['a'],
            labels: ['Series A'],
            lineColors: ['#0073aa ']
        });
        window.areaChart = Morris.Area({
            element: 'turnoverareachart',
            data: [{
                y: '2006',
                a: 10
            },
            {
                y: '2007',
                a: 15
            },
            {
                y: '2008',
                a: 10
            },
            {
                y: '2009',
                a: 35
            },
            {
                y: '2010',
                a: 20
            },
            {
                y: '2011',
                a: 32
            },
            ],
            xkey: 'y',
            resize: true,
            axes: false,
            padding: 0,
            hideHover: true,
            grid: false,
            smooth: false,
            redraw: true,
            ykeys: ['a'],
            labels: ['Series A'],
            lineColors: ['#0073aa ']
        });
    }


});
