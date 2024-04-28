import { NumFormatChartJs } from './number-format-chartjs';
import { NumberFormat } from './number-format';
import { Chart } from 'chart.js';
export class ChartJsAdapter {
  public static processFormatCallback(chartData) {
    this.processChartNumberData(chartData);
    //this.processLegendFormat(chartData);
    return chartData;
  }

  private static processDataLabelFormat(datalabels) {
    datalabels.formatter = (value, context) => {
      return NumberFormat.format(value, datalabels.dataFormat);
    };
  }

  private static processAxesChartJs(axes: any[], callbackFunc) {
    axes.forEach(axe => {
      try {
        if (axe.ticks.scalingPrecision || axe.ticks.scalingFormat) {
          if (callbackFunc) {
            axe.ticks.callback = callbackFunc(axe.ticks);
          }
        }
      } catch (errNoSticks) {}
    });
  }
  private static processChartNumberData(data) {
    try {
      if (data.options.scales) {
        let yAxes: any = data.options.scales.yAxes;
        let xAxes: any = data.options.scales.xAxes;
        this.processAxesChartJs(yAxes, tick => {
          return NumFormatChartJs.getFuncFormat(tick);
        });
        this.processAxesChartJs(xAxes, null);
      }
      let tooltips: any = data.options.tooltips;
      if (tooltips && tooltips.dataFormat) {
        this.processTooltipFormat(tooltips);
      }

      if (data.options.plugins.datalabels) {
        this.processDataLabelFormat(data.options.plugins.datalabels);
      }
    } catch (err) {
      console.log(err);
    }
  }
  private static processTooltipFormat(tooltips) {
    tooltips.callbacks = {
      label: function(tooltipItem, data) {
        let dataNum = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        dataNum = NumberFormat.format(dataNum, tooltips.dataFormat);
        return `${data.datasets[tooltipItem.datasetIndex].label}: ${dataNum}`;
      }
    };
  }

  private static processLegendFormat(chartData) {
    if (!chartData.options.legend) {
      return;
    }
    let legend = chartData.options.legend;
    if (!legend.labels) {
      legend.labels = {};
    }
    legend.labels.align = 'center';
    legend.labels.generateLabels = chart => {
      var data = chart.data;
      let labels = Chart.defaults.global.legend.labels.generateLabels(chart);
      let title = {
        text: 'Legend Title',
        strokeStyle: 'transparent',
        fillStyle: 'transparent',
        lineWidth: 1
      };
      return [title, ...labels];
    };
  }
}
