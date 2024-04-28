import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DateService {

    public static newUTCDate(date): Date {
        if (typeof (date) === 'string' || date === undefined || date === null || date == '') {
            date = new Date(date);
        };
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    public static parseImportted_At(date): Date {
        if (typeof (date) === 'string' && date.length < 12) {
            return this.parseDDMMYYYYtoDate(date);
        }
        return this.newUTCDate(date);
    }

    public static parseDDMMYYYYtoDate(dateString): Date {
        if (typeof (dateString) !== 'string' || dateString === undefined
            || dateString === null || dateString == ''
            || dateString === 'Invalid Date') {
            return this.newUTCDate(new Date());
        } else {
            let sdate = dateString.split('/');
            let dt = new Date();
            dt.setDate(Number.parseInt(sdate[0]));
            let m = Number.parseInt(sdate[1]) - 1;
            dt.setMonth(m);
            dt.setFullYear(Number.parseInt(sdate[2]));
            return this.newUTCDate(dt);
        }
    }

    public static getDate(date) {
        let dt = DateService.newUTCDate(date);
        if (dt === undefined || dt.toString() == 'Invalid Date') {
          dt = DateService.parseDDMMYYYYtoDate(date);
        }
        if (dt === undefined || dt.toString() == 'Invalid Date') {
          dt = DateService.newUTCDate(new Date())
        };
        return dt;
    }

    public static    convertUTCDateToLocalDate(dateUTC: Date) {
        if (typeof (dateUTC) === 'string') {
            dateUTC = new Date(dateUTC);
        };
        var newDate = new Date(dateUTC.getTime()+7*60*1000 + 15);
        return new Date(dateUTC);   
    }

    public static    convertLocalToUTC(dateLocal: Date) {
        return new Date(dateLocal.getTime() + dateLocal.getTimezoneOffset() * 60 * 1000);
    };

    public static   getDDMMYYY(dtLocal: Date): string {
        // console.log('--getDDMMYYY--timeUTC: ', dtLocal);
        if (typeof (dtLocal) === 'string') {
            dtLocal = new Date(dtLocal);
        };
        let s, sd, sm = '';
        // var dt = new Date();
        const dd = dtLocal.getDate();
        const mm = dtLocal.getMonth() + 1; // January is 0!

        const yyyy = dtLocal.getFullYear();
        if (dd < 10) {
            sd = '0' + dd;
        } else {
            sd = dd.toString();
        }
        if (mm < 10) {
            sm = '0' + mm;
        } else {
            sm = mm.toString();
        }

        // s = yyyy + '/' + sm + '/' + sd;
        s = sd + '/' + sm + '/' +  yyyy;
        return s;
    }

    public static     getDDMM(dtLocal: Date): string {
        console.log('--getDDMM--: ', dtLocal);
        if (typeof (dtLocal) === 'string') {
            dtLocal = new Date(dtLocal);
        };
        let s, sd, sm = '';
        // var dt = new Date();
        const dd = dtLocal.getDate();
        const mm = dtLocal.getMonth() + 1; // January is 0!

        // const yyyy = dtLocal.getFullYear();
        if (dd < 10) {
            sd = '0' + dd;
        } else {
            sd = dd.toString();
        }
        if (mm < 10) {
            sm = '0' + mm;
        } else {
            sm = mm.toString();
        }

        // s = yyyy + '/' + sm + '/' + sd;
        s = sd + '/' +  sm;
        return s;
    }

    public static    convertToDBTimeMMDDYYYY(dtLocal: Date): Date {
        if (typeof (dtLocal) === 'string') {
            dtLocal = new Date(dtLocal);
        };
        let dmy = this.getMMDDYYY(dtLocal);
        let dtUTC = this.convertUTCDateToLocalDate(new Date(dmy));
        // let dateDB = new Date(this.getMMDDYYY(dtUTC));
        return dtUTC;
    }
     
    public static getMMDDYYY(dtLocal: Date): string {
        if (typeof (dtLocal) === 'string') {
            dtLocal = new Date(dtLocal);
        };
        let s, sd, sm = '';
        // var dt = new Date();
        const dd = dtLocal.getDate();
        const mm = dtLocal.getMonth() + 1; // January is 0!

        const yyyy = dtLocal.getFullYear();
        if (dd < 10) {
            sd = '0' + dd;
        } else {
            sd = dd.toString();
        }
        if (mm < 10) {
            sm = '0' + mm;
        } else {
            sm = mm.toString();
        }

        s = sd + '/' + sm + '/' +  yyyy;
        return s;
    }
    public static    getStringYYYYMMDD(dtLocal: Date): string {
        if (typeof (dtLocal) === 'string' || dtLocal === undefined || dtLocal === null) {
            dtLocal = this.newUTCDate(new Date());
        };
        let s, sd, sm = '';
        // var dt = new Date();
        const dd = dtLocal.getDate();
        const mm = dtLocal.getMonth() + 1; // January is 0!

        const yyyy = dtLocal.getFullYear();
        if (dd < 10) {
            sd = '0' + dd;
        } else {
            sd = dd.toString();
        }
        if (mm < 10) {
            sm = '0' + mm;
        } else {
            sm = mm.toString();
        }

        s = yyyy + sm + sd;
        return s;
    }
}