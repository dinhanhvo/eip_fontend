import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from './app-store.service';
import { log } from 'util';

import { DateService } from './date.util.service';
import { PhieuKhamBenhModel } from '../model/phieukhambenh';
import { ExportExcelOption, ExportXntExcelOption, XntReportRowModel, XntSummaryModel } from '../common/selectitem';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class RecordeImportExportService {

    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };
    constructor(
        private http: HttpClient,
        private appStore: AppStoreService,
        private dateSvc: DateService
    ) {

    }
    // tinh tien thuoc thuong cua 1 benh nhan 
    getTongHopDungThuoc(mabn: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/tonghopdungthuoc/'
            + mabn
            + '?from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRort errror: ', error);
                }
            )
        );
    }

    // tinh tien thuoc thuong cua 1 benh nhan, use this to export excel
    exportBNDungThuocToExcel(mabn: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/benhnhandungthuoc/excel/'
            + mabn
            + '?from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRort errror: ', error);
                }
            )
        );
    }

    // tonghop tien thuoc hang ngay, use this to export excel
    exportTHTienthuocTungNgay(opts: ExportExcelOption, reportData: any[]): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        let body = {
            'opts': opts,
            'data': reportData
            // 'summaryData': summaryData
          }
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/tonghoptienthuoctungngay/excel'
            // + mabn
            // + '?from=' + from.toUTCString() + '&to=' + to.toUTCString()
            // ;
        return this.http.post(url, body, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRort errror: ', error);
                }
            )
        );
    }

    getPhieuLinhThuocHangNgay(khu: string, tkfrom: Date, tkto: Date, loai: number): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/linhthuochangngay?khu='
            + khu + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            + '&loai=' + loai;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    exportPhieuLinhThuocHangNgay(opts: ExportExcelOption, reportData: any[]): Observable<any>  {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/phieulanhthuoctungngay/excel';
        let body = {
            'opts': opts,
            'data': reportData,
            // 'summaryData': summaryData
        }
        return this.http.post(url, body, this.options).pipe(
            tap(
                data => {
                    console.log('got response data', data);
                },
                error => {
                    console.log('login error', error);
                }
            )
        );
    }
    getPatientUseThuocByKho(thuoc: string, kho: string, tkfrom: Date, tkto: Date): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patients/thuoc/kho?kho='
            + kho + '&thuoc=' + thuoc + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    getAllThuocTonByKho(kho: string, type: number): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/allthuocton?kho='
            + kho + '&type=' + type;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    getXuatNhapTonByKho(kho: string, tkfrom: Date, tkto: Date, all: boolean): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/xuatnhapton?kho='
            + kho + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            + '&all=' + all;
            // console.log('======getThongkeKeToanByKhu======url========================');
            // console.log(url);
            // console.log('====================================');
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    
    writeXNTFile(opts: ExportXntExcelOption, reportData: any[], summaryData: XntSummaryModel[]): Observable<any>  {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/xuatnhapton/excel';
        let body = {
            'opts': opts,
            'data': reportData,
            'summaryData': summaryData
        }
        return this.http.post(url, body, this.options).pipe(
            tap(
                data => {
                    console.log('got response data', data);
                },
                error => {
                    console.log('login error', error);
                }
            )
        );
    }

    // exportBNDungThuocToExcel(opts: ExportXntExcelOption, reportData: any[], summaryData: XntSummaryModel[]): Observable<any>  {
    //     const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/benhnhandungthuoc/excel/';
    //     // const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/xuatnhapton/excel';
    //     // + mabn
    //     // + '?from=' + from.toUTCString() + '&to=' + to.toUTCString()
    //     // ;
    //     let body = {
    //         'opts': opts,
    //         'data': reportData,
    //         'summaryData': summaryData
    //     }
    //     return this.http.post(url, body, this.options).pipe(
    //         tap(
    //             data => {
    //                 console.log('got response data', data);
    //             },
    //             error => {
    //                 console.log('login error', error);
    //             }
    //         )
    //     );
    // }

    writeXNTFileTest() {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/testexcell';
        return this.http.get(url).pipe(
            tap(
                data => {
                    console.log('got response data', data);
                },
                error => {
                    console.log('login error', error);
                }
            )
        );
    }

    getBCTonghop(kho: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/bctonghop?kho='
            + kho + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
            console.log('======getThongkeKeToanByKhu======url========================');
            console.log(url);
            console.log('====================================');
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    getBCTonghopLoaiThuoc(from: Date, to: Date, kho: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/bctonghoploai?'
            + 'kho=' + kho
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
            console.log('======getThongkeKeToanByKhu======url========================');
            console.log(url);
            console.log('====================================');
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

    getBCXuatTheoLoaiThuoc(kho: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/BCXuatTheoLoaiThuoc?'
            + 'kho = ' + kho
            + '&from=' + from.toUTCString()
            + '&to=' + to.toUTCString();
            console.log('======getThongkeKeToanByKhu======url========================');
            console.log(url);
            console.log('====================================');
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKhu errror: ', error);
                }
            )
        );
    }

}
