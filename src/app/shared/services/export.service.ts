import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from '../../shared/services/app-store.service';

import { DateService } from './date.util.service';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class ExportService {

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

    getAllExports(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/exports';
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

    geExportsByThuoc(prId): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/exports/thuoc/' + prId;
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

    geExportsByThuocAndDate(prId, date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/exports/thuoc/date?thuoc=' + prId + '&date=' + date;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data.thuocs);
                },
                error => {
                    console.log(' geExportsByThuocAndDate errror: ', error);
                }
            )
        );
    }

    geExportsByThuocAndDates(prId: number, from: Date, to: Date): Observable<any> {
        let sFrom = DateService.getMMDDYYY(from);
        let sTo = DateService.getMMDDYYY(to);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/exports/thuoc/dates?thuoc=' + prId + '&from=' + sFrom + '&to=' + sTo;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data.thuocs);
                },
                error => {
                    console.log(' geExportsByThuocAndDates errror: ', error);
                }
            )
        );
    }
    getExport(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/export/' + id;

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
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/export/type/' + id;

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

    addExport(ex): Observable<any> {
        console.log('insert prod: ', ex);
        // url="http://localhost:8089/api/upload"
        ex.exported_at = new Date(DateService.getMMDDYYY(ex.exported_at));
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/export';
        return this.http.post(url, ex, jsonOptions).pipe(
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

    editExport(prod): Observable<any> {
        console.log('insert prod: ', prod);
        // url="http://localhost:8089/api/upload"
        prod.imported_at = new Date(DateService.getMMDDYYY(prod.imported_at));
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/export';
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

    deleteExport(id): Observable<any> {
        console.log(' deleteExport delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/export/' + id;
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