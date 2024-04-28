import { NumberFormat } from './number-format';

export class NumFormatChartJs {
  private static applyScalePrecision(num: number, precision: string) {
    switch (precision) {
      case 'thousand': {
        num = num / 1000;
        break;
      }
      case 'million': {
        num = num / 1000000;
        break;
      }
      case 'billion': {
        num = num / 1000000000;
        break;
      }
      default: {
        break;
      }
    }
    return num;
  }

  private static getScalePrecisionSymbol(precision: string) {
    let symbol = '';
    switch (precision) {
      case 'thousand': {
        symbol = 'K';
        break;
      }
      case 'million': {
        symbol = 'M';
        break;
      }
      case 'billion': {
        symbol = 'B';
        break;
      }
      default: {
        break;
      }
    }
    return symbol;
  }

  private static isScalingPrecision(tick: any) {
    return tick && tick.scalingPrecision && ['thousand', 'million', 'billion'].includes(tick.scalingPrecision);
  }

  public static getFuncFormat(tick: any) {
    return (label, index, labels) => {
      try {
        let num = Number(label);
        if (isNaN(num)) return label;
        let isScalingPrecision = this.isScalingPrecision(tick);
        if (isScalingPrecision) {
          num = this.applyScalePrecision(num, tick.scalingPrecision);
        }
        let numStr = '';
        if (tick && tick.scalingFormat) {
          numStr = NumberFormat.format(num, tick.scalingFormat);
        } else {
          numStr = num.toFixed(0);
        }
        return numStr + (isScalingPrecision ? this.getScalePrecisionSymbol(tick.scalingPrecision) : '');
      } catch (ex) {
        return label;
      }
    };
  }
}
