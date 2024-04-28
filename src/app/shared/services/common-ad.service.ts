import { Injectable } from '@angular/core';
import { CommonFunc, AdConstant, CUSTOM_FOLDER_TYPE, BUSINESS_OBJECT_TYPE } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class CommonAdService {
  constructor() {}

  public clone(obj: any) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  public getParamValueStr(p: any) {
    if (p.value instanceof Date) {
      let str = CommonFunc.strftime(AdConstant.JS_DATE_FORMAT_DEFAULT, p.value);
      return str;
    } else if (CommonFunc.isArray(p.value) && !CommonFunc.isEmpty(p.value)) {
      return "'" + p.value.join("','") + "'";
    }
    return '' + p.value;
  }

  public isNumericItem(item: any): boolean {
    return item && item.expDataType && item.expDataType === AdConstant.DATATYPE_NUMBER;
  }

  public newCondFormat(): Object {
    return {
      __class__: 'codix.report.bo.ConditionalFormat',
      applyTo: 'cells',
      autoName: false,
      stoplight: false,
      formatData: this.newFormatData()
    };
  }

  public newFormatData(): Object {
    return {
      __class__: 'codix.report.bo.FormatData'
    };
  }

  public newSchedule(): Object {
    let sch = {
      __class__: 'codix.report.bo.Schedule',
      timeoutGenerationMinutes: 30,
      options: {}
    };
    return sch;
  }

  public newMpSchedule(): Object {
    let sch = {
      __class__: 'codix.report.bo.MPSchedule',
      name: 'Mass schedule',
      mpTimeout: 1200,
      partialTimeout: 60,
      options: {},
      csvAttributes: this.newCsvAttributes()
    };
    return sch;
  }

  public newCsvAttributes(): Object {
    let res = {
      __class__: 'codix.report.bo.CsvAttributes',
      delimiterApplyTo: 'none',
      fieldDelimiter: '"',
      fileEncoding: 'UTF8',
      returnLineType: 'UNIX',
      rowHeader: 'fieldHeadingsOnly',
      separator: ',',
      returnLineTypeAscii: '',
      specialCharacter: 'none'
    };
    return res;
  }

  public newMpParameter(p: any): Object {
    let res = {
      __class__: 'codix.report.bo.MPScheduleParameter',
      paramId: p ? p.boId : null,
      paramName: p ? p.name : '',
      paramPrompt: p ? p.prompt : '',
      paramType: p ? p.dataType : AdConstant.DATATYPE_CHAR,
      useCalc: p && p.useCalc ? true : false,
      simpleValue: true
    };
    return res;
  }

  public newTotal(): Object {
    let total = {
      __class__: 'codix.report.bo.Total',
      boId: null
    };
    return total;
  }

  public newUserSetting(module, group, name): Object {
    let setting = {
      __class__: 'codix.report.bo.UserSetting',
      module,
      group,
      name
    };
    return setting;
  }

  public setParamValue(p: any, str: string) {
    if (p.dataType === AdConstant.DATATYPE_DATETIME) {
      // console.log('set param value', p, str);
      let dVal = CommonFunc.parseDate(str, new Date());
      // console.log('date value', dVal);
      p.value = dVal;
      return dVal;
    }
    p.value = str;
    return str;
  }

  public newTransEntry(objectId: number, key: string, lang: string, value?: string) {
    let res = {
      __class__: 'codix.report.bo.TranslationEntry',
      objectId,
      key,
      lang,
      value
    };
    return res;
  }

  public newFolderFO() {
    let fd = {
      __class__: 'codix.report.bo.FolderFO',
      folderType: CUSTOM_FOLDER_TYPE.JOIN,
      businessObjectType: BUSINESS_OBJECT_TYPE.FOLDER_FO,
      distinctFlag: false
    };
    return fd;
  }
}
