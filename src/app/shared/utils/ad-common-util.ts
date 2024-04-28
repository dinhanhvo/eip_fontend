export class AdCommonUtil {
  public static isInClauseValid(sql: string) {
    console.log('Check in clause');
    if (!sql) {
      return true;
    }

    var indexBegin = sql.indexOf('IN (');
    if (indexBegin < 0) {
      return true;
    }

    var indexEnd = sql.indexOf(')', indexBegin);
    if (indexEnd < 0) {
      return true;
    }

    sql = sql.substring(indexBegin + 5, indexEnd);
    var arr = sql.split(',');
    if (arr.length <= 1000) {
      return true;
    }
    return false;
  }

  public static getClsName(obj: any): string {
    let clsNames = obj.__class__.split('.');
    let clsName = clsNames[clsNames.length - 1];
    return clsName;
  }
}
