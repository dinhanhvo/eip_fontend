import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils';

const API_AD_REPORTS: string = '/ad-reports';
const API_AD_REPORT_FILES: string = '/ad-reports/:wbId/report-files';
const API_AD_REPORT_DOWNLOAD_FILE: string = '/ad-reports/report-files/:fileId/download';

@Injectable({
  providedIn: 'root'
})
export class AdReportService {
  constructor(private baseService: BaseService) {}

  public getAdReports(filter: string) {
    return this.baseService.postData(API_AD_REPORTS, { filter: filter }).pipe(tap(resp => {}, err => {}));
  }

  public getAdReportFiles(wbId: any, body: any) {
    let url = CommonFunc.prepareUrl(API_AD_REPORT_FILES, { wbId: wbId });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getAdReportDownloadFiles(fileId: any) {
    let url = CommonFunc.prepareUrl(API_AD_REPORT_DOWNLOAD_FILE, { fileId: fileId });
    return this.baseService.postData(url, {}).pipe(tap(resp => {}, err => {}));
  }
}
