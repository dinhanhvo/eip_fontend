import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from './app-store.service';
import { log } from 'util';

import { DateService } from './date.util.service';
import { PhieuKhamBenhModel } from '../model/phieukhambenh';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class PhieukhambenhService {

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

    getAllPhieukhambenhs(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenhs';

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

    getPhieukhambenh(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/' + id;

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

    getPhieukhambenhsByDates(from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPhieukhambenhsByDates errror: ', error);
                }
            )
        );
    }

    getPhieukhambenhsByMabenhnhan(mabenhnhan: string, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/patient/dates?mabenhnhan='
            + mabenhnhan + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPhieukhambenhsByMabenhnhan errror: ', error);
                }
            )
        );
    }

    getPhieukhambenhsByKhu(khuId: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/khu/dates?khuId='
            + khuId + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPhieukhambenhsByKhu errror: ', error);
                }
            )
        );
    }

    getThongkeKeToanByKhu(khu: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/tkktkhu/dates?khu_id='
            + khu + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
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

    getThongkeKeToanByKho(kho: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/tkktkho/dates?kho_id='
            + kho + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getThongkeKeToanByKho errror: ', error);
                }
            )
        );
    }

    getXuatNhapTonByKho(kho: string, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/xuatnhapton?kho='
            + kho + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
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

    // tinh tien thuoc thuong cua 1 benh nhan 
    getPatientTTTT(mabn: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/tinhtientt/'
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

    // tinh  tien kcbenh benh nhan cua 1 kho
    getPatientsReportTT(kho: string, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/khambenh/patients/tinhtien?'
            + 'kho=' + kho
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRortTT errror: ', error);
                }
            )
        );
    }

    // tinh  tien kcbenh cua ds benh nhan
    getTHTienThuocTheoNgay(kho: string, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/khambenh/patients/tonghoptinhtientheongay?'
            + 'kho=' + kho
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRortTT errror: ', error);
                }
            )
        );
    }

    // tinh tien kcbenh 1 benh nhan
    getTinhTienBN(mabn: string, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/khambenh/patient/tinhtien?'
            + 'mabn=' + mabn
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString()
            ;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getPatientRortTT errror: ', error);
                }
            )
        );
    }

    // getBCTonghop(kho: string, from: Date, to: Date): Observable<any> {
    //     // const sFrom = this.dateSvc.getMMDDYYY(from);
    //     // const sTo = this.dateSvc.getMMDDYYY(to);
    //     const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenhs/bctonghop?kho='
    //         + kho + '&from='
    //         + from.toUTCString()
    //         + '&to=' + to.toUTCString();
    //         console.log('======getThongkeKeToanByKhu======url========================');
    //         console.log(url);
    //         console.log('====================================');
    //     return this.http.get<any>(url, this.options).pipe(
    //         tap(
    //             data => {
    //                 console.log(data);
    //             },
    //             error => {
    //                 console.log(' getThongkeKeToanByKhu errror: ', error);
    //             }
    //         )
    //     );
    // }

    getBCXuatTheoLoaiThuoc(kho: string, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/records/bctonghoploai?'
            + 'kho=' + kho
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

    addPhieukhambenh(cate): Observable<any> {
        console.log('insert cate: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh';
        return this.http.post(url, cate, jsonOptions).pipe(
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

    editPhieukhambenh(cate): Observable<any> {
        console.log('update phieukhambenh: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh';
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

    deletePhieukhambenh(id): Observable<any> {
        console.log('  delete phieukhambenh: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/' + id;
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

    deletePhieukhambenhModel(p: PhieuKhamBenhModel): Observable<any> {
        console.log('  delete phieukhambenh: ', p);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieukhambenh/delete';
        return this.http.put(url, p, jsonOptions).pipe(
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
