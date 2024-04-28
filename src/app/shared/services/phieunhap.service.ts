import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from '../../shared/services/app-store.service';
import { DateService } from './date.util.service';
import { ExportExcelOption } from '../common/selectitem';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class PhieunhapService {

    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };
    constructor(
        private http: HttpClient,
        private appStore: AppStoreService
    ) {

    }

    getAllPhieunhaps(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhaps';

        // return this.http.get<any>('assets/data/products.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.products);
                },
                error => {
                    // console.log('product-service: error', error);
                }
            )
        );
    }

    getPhieunhapByDates(tkfrom: Date, tkto: Date): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhaps/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString();
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThuocXuatToKhus(tkfrom: Date, tkto: Date, kho: string): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/thuocthekho?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString()
            + '&kho=' + kho;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    // thekho to export excel
    exportTheKho(opts: ExportExcelOption, exportData: any[], summaryData: any[]): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        let body = {
            'opts': opts,
            'data': exportData,
            'summaryTheKhoData': summaryData
          }
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/thekho/excel'
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

    getThekhos(tkfrom: Date, tkto: Date, thuoc: string, kho: string): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/thekho?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString()
            + '&thuoc=' + thuoc
            + '&kho=' + kho;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                },
                error => {
                }
            )
        );
    }

    getTonDauByKho(thuoc: string, kho: string, tkfrom: Date, tkto: Date): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api
            + '/records/thekho/tondaukho?'
            + 'thuoc=' + thuoc
            + '&kho=' + kho
            + '&from=' + from.toUTCString()
            + '&to=' + to.toUTCString();
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                },
                error => {
                }
            )
        );
    }

    getTonDauCuoiByKhoAndThuoc(thuoc: string, kho: string, tkfrom: Date, tkto: Date): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api
            + '/records/thekho/tondaucuoi?'
            + 'thuoc=' + thuoc
            + '&kho=' + kho
            + '&from=' + from.toUTCString()
            + '&to=' + to.toUTCString();
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                },
                error => {
                }
            )
        );
    }

    getPhieunhapByKhoAndDates(tkfrom: Date, tkto: Date, kho: string): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhaps/kho/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThongKeNhap(provider: string, shd: string, solo: string,
        tkfrom: Date, tkto: Date, kho: string, maThuoc: string): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhaps/thongke?'
            + 'ct=' + provider
            + '&shd=' + shd
            + '&kho=' + kho
            + '&thuoc=' + maThuoc
            + '&solo=' + solo
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThongKeChiTietThuocNhap(
        tkfrom: Date, tkto: Date, kho: string, maThuoc: string, provider: string): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhaps/thongkechitietthuocnhap?'
            + 'kho=' + kho
            + '&thuoc=' + maThuoc
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            + '&provider=' + provider
            ;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getToncuByThuocAndKho(thuoc: string, kho: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocton?'
            + 'thuoc=' + thuoc+ '&kho=' + kho;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getPhieunhap(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhap/' + id;

        // return this.http.get<any>('assets/data/products.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.products);
                },
                error => {
                    // console.log('product-service: error', error);
                }
            )
        );
    }

    addPhieunhap(cate): Observable<any> {
        console.log('insert phieunhap: ', JSON.stringify(cate));
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhap';

        return this.http.post(url, cate, jsonOptions).pipe(
            tap(
                data => {
                    console.log('got phieunhap response data', data);
                },
                error => {
                    console.log('phieunhap error', error);
                }
            )
        );
    }

    editPhieunhap(cate): Observable<any> {
        console.log('insert prod: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieunhap';
        return this.http.put(url, cate, jsonOptions).pipe(
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

    deletePhieunhap(id): Observable<any> {
        console.log(' cate delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieu/' + id;
        return this.http.delete(url).pipe(
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

}