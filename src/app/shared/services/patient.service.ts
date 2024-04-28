import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from '../../shared/services/app-store.service';
import { log } from 'util';
import { DateService } from './date.util.service';
import { PatientModel } from '../model/patient.model ';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class PatientService {

    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };
    patients: PatientModel[] = [];
    constructor(
        private http: HttpClient,
        private appStore: AppStoreService,
        private dateSvc: DateService
    ) {
        this.getAllServerPatients().subscribe(
            res => {
                this.patients = res.data;
            },
            err => {
                console.log(err);
                
            }
        );
    }

    
    getAllPatients(): PatientModel[] {
        if (this.getCLientPatients().length > 0 ) {
            return this.getCLientPatients();
        }
        this.getAllServerPatients().subscribe(
            res => {
                this.patients = res.data;
                return [...this.patients];
            },
            err => {
                console.log(err);
                return this.patients;
            }
        );
    }

    getCLientPatients(): PatientModel[] {
        return [...this.patients];
    }

    setClientPatiens(pts: PatientModel[]) {
        this.patients = [...pts];
    }

    getAllServerPatients(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patients';

        // return this.http.get<any>('assets/data/patients.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.patients);
                },
                error => {
                    // console.log('patient-service: error', error);
                }
            )
        );
    }

    getPatient(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patient/' + id;

        // return this.http.get<any>('assets/data/patients.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.patients);
                },
                error => {
                    // console.log('patient-service: error', error);
                }
            )
        );
    }

    getPatientsByType(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patients/type/' + id;

        // return this.http.get<any>('assets/data/patients.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs type: ' + id, data.patients);
                },
                error => {
                    console.log('patient-service: error', error);
                }
            )
        );
    }

    getPatientsByCate(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patients/category/' + id;

        // return this.http.get<any>('assets/data/patients.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs patients: ' + id, data.patients);
                },
                error => {
                    console.log('cate patient-service: error', error);
                }
            )
        );
    }

    getImgsPatient(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patient/imgs/' + id;

        // return this.http.get<any>('assets/data/patients.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('imgs: ', data);
                },
                error => {
                    // console.log('patient-service: error', error);
                }
            )
        );
    }

    skip(patient: PatientModel) {
        patient.birthday = null; // this.dateSvc.getMMDDYYY(patient.birthday);
        patient.password = 'a';
        patient.username = '';
        if (patient.blood === 'Khác') {
            patient.blood = '---';
        }
        // if (patient.weight == 0) {
        //     patient.weight = null;
        // }
    }

    addPatient(patient: PatientModel): Observable<any> {
        console.log('insert patient: ', patient);
        // patient.imported_at = this.dateSvc.getMMDDYYY(patient.imported_at).toString();
        // this.skip(patient);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patient';
        // let cates = [...patient.categories];
        // patient.categorys.push(patient.categories);
        // patient.categories = null;
        const body = {
            'prod': patient
            // 'categories': cates
        };

        return this.http.post(url, patient, jsonOptions).pipe(
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

    addPatients(patients: PatientModel[]): Observable<any> {
        console.log('insert patient: ', patients);
        // patient.imported_at = this.dateSvc.getMMDDYYY(patient.imported_at).toString();
        // this.skip(patient);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patients';
        // let cates = [...patient.categories];
        // patient.categorys.push(patient.categories);
        // patient.categories = null;
        const body = {
            'prod': patients
            // 'categories': cates
        };

        return this.http.post(url, patients, jsonOptions).pipe(
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

    editPatient(patient: PatientModel): Observable<any> {
        console.log('editPatient: ', patient);
        this.skip(patient);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patient';
        return this.http.put(url, patient, jsonOptions).pipe(
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


    deletePatient(id): Observable<any> {
        console.log(' patient delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/patient/' + id;
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