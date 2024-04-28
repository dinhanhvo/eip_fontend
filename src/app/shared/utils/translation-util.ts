// import { TranslateService } from '@ngx-translate/core';
// import { Observable, forkJoin } from 'rxjs';
// import { CommonFunc } from './common-func';

export class TranslationUtil {
  // public static getDashboardTranslation(wb: Workbook[], defaultLang: string, type: string) {
  //   let workbooks = [];
  //   var isDefaultLang = { isDefaultLang: false };
  //   // console.log(wb);
  //   // if (wb.length == 0) {
  //   if (!Array.isArray(wb)) {
  //     workbooks.push(wb);
  //   } else {
  //     workbooks = wb;
  //   }
  //   // console.log('wb', wb);
  //   // console.log('workbooks', workbooks);
  //   for (var i = 0; i < workbooks.length; i++) {
  //     let enNumber = 0;
  //     let newDefLang = 0;
  //     if (workbooks[i]['translations']) {
  //       for (var k = 0; k < workbooks[i].translations.length; k++) {
  //         if (workbooks[i].translations[k].lang == defaultLang && workbooks[i].translations[k].key == type) {
  //           workbooks[i].translations[k].isDefaultLang = true;
  //           newDefLang = k;
  //         } else if (workbooks[i].translations[k].lang == 'en' && workbooks[i].translations[k].key == type) {
  //           workbooks[i].translations[k].isDefaultLang = true;
  //           enNumber = k;
  //         } else {
  //           workbooks[i].translations[k].isDefaultLang = false;
  //         }
  //         if (newDefLang != 0) {
  //           workbooks[i].translations[newDefLang].isDefaultLang = true;
  //           workbooks[i].translations[enNumber].isDefaultLang = false;
  //         }
  //       }
  //     }
  //   }
  //   if (workbooks.length == 1) {
  //     if (type == 'sh.name') {
  //       return workbooks;
  //     }
  //     return workbooks[0];
  //   } else {
  //     return workbooks;
  //   }
  // }

  // public static findTranslations(trans: any[], predicate: (tran: any) => boolean) {
  //   let res = [];
  //   for (let tran of trans) {
  //     if (predicate(tran)) {
  //       res.push(tran);
  //     }
  //   }
  //   return res;
  // }

  // public static findFirst(trans: any[]) {
  //   if (!trans || trans.length == 0) return null;
  //   return trans[0];
  // }

  // public static transLabels(lbs: any[], trans: TranslateService): Observable<string[]> {
  //   let obs: Observable<string>[] = [];
  //   for (let lb of lbs) {
  //     if (CommonFunc.isString(lb)) {
  //       let ob = trans.get(lb);
  //       obs.push(ob);
  //       continue;
  //     }
  //     if (CommonFunc.isArray(lb)) {
  //       let [key, params] = lb;
  //       let ob = trans.get(key, params);
  //       obs.push(ob);
  //     }
  //   }
  //   return forkJoin(obs);
  // }
}
