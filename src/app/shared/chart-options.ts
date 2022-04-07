import {ChartOptions} from 'chart.js';

export const pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};

export const barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{
      display: false
    }], yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }] },
  tooltips: {
    enabled: true,
    mode: 'label',
    callbacks: {
      title: function (tooltipItems, data: any) {
        const idx = tooltipItems[0].index;
        return data.labels[idx];
      }
    }
  }
};
