window.Apex = {
    chart: {
        foreColor: '#ccc',
        toolbar: {
            show: false
        },
    },
    stroke: {
        width: 3
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        theme: 'dark'
    },
    grid: {
        borderColor: "#535A6C",
        xaxis: {
            lines: {
                show: true
            }
        }
    }
};

var spark1 = {
    chart: {
        id: 'spark1',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

var spark2 = {
    chart: {
        id: 'spark2',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
    }],
    stroke: {
        curve: 'smooth'
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    markers: {
        size: 0
    },
    colors: ['#fff'],
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

var spark3 = {
    chart: {
        id: 'spark3',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

var spark4 = {
    chart: {
        id: 'spark4',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

new ApexCharts(document.querySelector("#spark1"), spark1).render();
new ApexCharts(document.querySelector("#spark2"), spark2).render();
new ApexCharts(document.querySelector("#spark3"), spark3).render();
new ApexCharts(document.querySelector("#spark4"), spark4).render();


var optionsLine = {
    chart: {
        height: 328,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: true,
            top: 3,
            left: 2,
            blur: 4,
            opacity: 1,
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    series: [{
        name: "Ventas Anio Pasado",
        data: [8, 140, 230, 180, 300, 250, 300, 190, 200, 170, 300, 100].map(val => val * 10000)
    },
    {
        name: "Ventas",
        data: [25, 300, 240].map(val => val * 10000)
    },
    {
        name: "Metas",
        data: [20, 350, 400, 200, 350, 400, 350, 400, 200, 300, 350, 250].map(val => val * 10000)
    }]
,
    title: {
        text: 'Ventas vs Metas',
        align: 'left',
        offsetY: 25,
        offsetX: 20
    },
    subtitle: {
        offsetY: 55,
        offsetX: 20
    },
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        }
    },
    grid: {
        show: true,
        padding: {
            bottom: 0
        }
    },
    labels: ['01/30/2024', '02/30/2024', '03/30/2024', '04/30/2024', '05/30/2024', '06/30/2024', '07/30/2024', '08/30/2024', '09/30/2024', '10/30/2024', '11/30/2024', '12/30/2024'],
    xaxis: {
        tooltip: {
            enabled: false
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20
    }
}

var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
chartLine.render();