import {ChartOptions} from 'chart.js';
import {ChartConfiguration} from 'chart.js';

export const pieChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    datalabels: {
      formatter: (value, ctx) => {
        const chartLabels = ctx.chart.data.labels;
        if (chartLabels) {
          const label = chartLabels[ctx.dataIndex];
          return label;
        }
        return null;
      },
    },
  }
};


export const barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    },
    x: {
      display: false
    }
  },
  plugins: {
    tooltip: {
      enabled: true,
    }
  }
};


export const doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  plugins: {
    datalabels: {
      display: true,
      anchor: 'center',
      align: 'center',
      font: {
        size: 12,
      },
      color: '#000000'
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      display: true,
    },
  },

};

