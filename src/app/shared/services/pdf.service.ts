import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils/common-func';

const API_PDFTEMPLATE_BY_DASHBOARD: string = '/dashboards/:id/pdf-templates';
const API_EXPORT_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/:pid/export';
const API_SAVE_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/:pid/save';
const API_SAVE_AS_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/:pid/save-as';
const API_SAVE_ALL_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/save-all';
const API_DELETE_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/:pid/';
const API_ADD_PDFTEMPLATE: string = '/dashboards/:id/pdf-template';
const API_RECENT_CHANGED_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/check-recent-change';
const API_UPDATE_PDFTEMPLATE: string = '/dashboards/:id/pdf-templates/:pid/';
const DEFAULT_MY_PDF_BODY: Object = {
  fields: 'id,name,createdBy,updatedBy,updatedDate',
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-createdDate'
};
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private baseService: BaseService) {}
  getPdfTemplates(wbId: number) {
    let url = CommonFunc.prepareUrl(API_PDFTEMPLATE_BY_DASHBOARD, { id: wbId });
    return this.baseService.getData(url).pipe(
      tap(
        resp => {
          //console.log('data');
        },
        err => {
          //console.log('error');
        }
      )
    );
  }

  getRecentChange(wbId: number, pid: number) {
    let url = CommonFunc.prepareUrl(API_RECENT_CHANGED_PDFTEMPLATE, { id: wbId });
    let data = { pid: pid };
    return this.baseService.postData(url, data).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  getExportFile(wbId: number, pid: number, isPreview: boolean) {
    let url = CommonFunc.prepareUrl(API_EXPORT_PDFTEMPLATE, { id: wbId, pid: pid });
    return this.baseService.postData(url, { isPreview: isPreview }).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  delPdfTemplate(wbId: number, pid: number) {
    let url = CommonFunc.prepareUrl(API_DELETE_PDFTEMPLATE, { id: wbId, pid: pid });
    return this.baseService.deleteData(url).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  savePdfTemplate(wbId: number, pid: number) {
    let url = CommonFunc.prepareUrl(API_SAVE_PDFTEMPLATE, { id: wbId, pid: pid });
    return this.baseService.putData(url, {}).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  saveAsPdfTemplate(wbId: number, pid: number, name: string) {
    let url = CommonFunc.prepareUrl(API_SAVE_AS_PDFTEMPLATE, { id: wbId, pid: pid });
    return this.baseService.postData(url, { name: name }).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  saveAllPdfTemplate(wbId: number) {
    let url = CommonFunc.prepareUrl(API_SAVE_ALL_PDFTEMPLATE, { id: wbId });
    return this.baseService.postData(url, {}).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  addPdfTemplate(wbId: number, pdfTemplate: any) {
    let url = CommonFunc.prepareUrl(API_ADD_PDFTEMPLATE, { id: wbId });
    return this.baseService.postData(url, pdfTemplate).pipe(
      tap(
        resp => {},
        err => {
          //console.log('error');
        }
      )
    );
  }

  updatePdfTemplate(wbId: number, pdfTemplate: any) {
    let url = CommonFunc.prepareUrl(API_UPDATE_PDFTEMPLATE, { id: wbId, pid: pdfTemplate.boId });
    return this.baseService.putData(url, pdfTemplate).pipe(tap(resp => {}, err => {}));
  }
}
