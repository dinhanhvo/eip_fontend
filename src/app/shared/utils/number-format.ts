export class NumberFormat {
  public static format(num, formatData: any) {
    let data = num;
    if (formatData.numberCategory == 'currency') {
      data = this.formatCurrency(num, formatData);
    } else if (formatData.numberCategory == 'number') {
      data = this.formatNumber(num, formatData);
    } else if (formatData.numberCategory == 'percent') {
      data = this.formatPercent(num, formatData);
    }
    return data;
  }
  private static formatNumber(num, formatData: any) {
    let numStr = Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: formatData.decimalPlaces,
      minimumFractionDigits: formatData.decimalPlaces
    }).format(num);
    numStr = this.applySeparator(numStr, formatData);
    return numStr;
  }

  private static applySeparator(numStr, formatData) {
    numStr = numStr.replace(new RegExp(',', 'g'), formatData.thousandSeparator);
    numStr = numStr.replace(/.([^.]*)$/, formatData.decimalSeparator + '$1');
    return numStr;
  }

  private static formatCurrency(num, formatData: any) {
    let numStr = this.formatNumber(num, formatData);
    let posSymbol = !formatData.positionSymbol ? 'left' : formatData.positionSymbol;
    return 'right'.toUpperCase() == posSymbol.toUpperCase()
      ? numStr + formatData.currency
      : formatData.currency + numStr;
  }

  private static formatPercent(num, formatData: any) {
    let numStr = Intl.NumberFormat('es-US', {
      style: 'percent',
      maximumFractionDigits: formatData.decimalPlaces,
      minimumFractionDigits: formatData.decimalPlaces
    }).format(num);
    numStr = this.applySeparator(numStr, formatData);
    return numStr;
  }
}
