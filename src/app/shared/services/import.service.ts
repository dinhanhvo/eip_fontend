import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from '../../shared/services/app-store.service';

import { ImportModel } from '../model/import.model';
import { DateService } from './date.util.service';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class ImportService {

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

    getAllImports(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports';

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

    getPhieusByType(type): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/type?type=' + type;
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
    
    getPhieusByTypeToncu(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/toncus';
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

    getPhieusByTypeAndDates(type, from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/type/dates?type=' + type
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString();
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

    getThuocByTypeAndDatesAndKho(type, from: Date, to: Date, kho: string, thuoc_id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/type/dates/kho?type=' + type
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho + '&thuoc_id='+thuoc_id;
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

    getThuocByTypeAndDates(type, from: Date, to: Date, thuoc_id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/type/dates/thuoc_id?type=' + type
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&thuoc_id='+thuoc_id;
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


    getPhieusByTypeAndDatesAndKho(type, from: Date, to: Date, kho: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/type/dates/kho?type=' + type
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho;
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

    getExportByDatesAndKhoAndKhu(from: Date, to: Date, kho: string, khu: string): Observable<any> {
        const type = -1;
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/dates/kho/khu?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho + '&khu=' + khu;
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

    getExportThuocByDatesAndKhoAndKhu(thuoc_id, from: Date, to: Date, kho: string, khu: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/thuoc/dates/kho/khu?' 
            +'thuoc_id=' + thuoc_id
            + '&from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho + '&khu=' + khu;
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

    geImportsByThuoc(prId): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/thuoc/' + prId;
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

    getToncuByThuocAndKho(thuoc_id, kho): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/toncu?'
            + 'thuoc_id=' + thuoc_id + '&kho=' + kho;
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

    getMaloByKhoAndThuocTon(kho_id, thuoc_id) {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/kho/thuoc?kho_id='
            + kho_id + '&thuoc_id=' + thuoc_id;
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

    geImportsByThuocAndDate(prId, date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/thuoc/date?thuoc=' + prId + '&date=' + date;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data.thuocs);
                },
                error => {
                    console.log(' geImportsByThuocAndDate errror: ', error);
                }
            )
        );
    }

    getImportsByThuocAndDates(prId: number, from: Date, to: Date): Observable<any> {
        // const sFrom = this.dateSvc.getMMDDYYY(from);
        // const sTo = this.dateSvc.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/imports/thuoc/dates?thuoc=' + prId + '&from=' + from + '&to=' + to;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data.thuocs);
                },
                error => {
                    console.log(' getImportsByThuocAndDates errror: ', error);
                }
            )
        );
    }

    getImport(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/import/' + id;

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

    getThuocsByType(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/import/type/' + id;

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

    addImport(im: ImportModel): Observable<any> {
        console.log('insert prod: ', im);
        // url="http://localhost:8089/api/upload"
        // im.imported_at = new Date(this.dateSvc.getMMDDYYY(im.imported_at));
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/import';
        return this.http.post(url, im, jsonOptions).pipe(
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

    editImport(prod): Observable<any> {
        console.log('insert prod: ', prod);
        // url="http://localhost:8089/api/upload"
        // prod.imported_at = new Date(this.dateSvc.getMMDDYYY(prod.imported_at));
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/import';
        return this.http.put(url, prod, jsonOptions).pipe(
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

    deleteImport(id): Observable<any> {
        console.log(' deleteImport delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/import/' + id;
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

    uploadFile(fileToUpload: File): Observable<any> {
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/upload';

        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return this.http.post(url, formData).pipe(
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