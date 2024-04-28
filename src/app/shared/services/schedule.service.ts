import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils/common-func';
import { QueryObjectsType } from './common-ad-api.service';

const API_DELETE_SCHEDULE: string = '/schedules/:schId';
const API_GET_TRACE_FILES: string = '/schedule-traces/:traceId/files';
const API_LOAD_SCHEDULE: string = '/schedules/:id';
const API_RE_SCHEDULE: string = '/schedules/:schId/reschedule';
const API_SCHEDULE_BY_DASHBOARD: string = '/dashboards/:id/schedules';
const API_SCHEDULE_TRACES: string = '/schedules/:id/traces';
const API_UN_SCHEDULE: string = '/schedules/:schId/unschedule';
const API_UPDATE_SCHEDULES: string = '/schedule/update';
const DEFAULT_MY_SCHEDULES_BODY: Object = {
  fields: 'id,name,createdBy,updatedBy,updatedDate',
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-createdDate'
};
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  mySchedules: string = '/me/schedules';

  constructor(private baseService: BaseService) {}

  fetchSchedules(): Observable<any>;
  fetchSchedules(body: any): Observable<any>;
  fetchSchedules(body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    const newBody = { ...DEFAULT_MY_SCHEDULES_BODY, ...body };

    return this.baseService.postData(this.mySchedules, newBody).pipe(
      tap(
        resp => {
          console.log('schedule-service: got response data', resp);
        },
        error => {
          console.log('schedule-service: failed to fetch schedules', error);
        }
      )
    );
  }

  fetchSchedulesByDashboardId(id: number, body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    const url = CommonFunc.prepareUrl(API_SCHEDULE_BY_DASHBOARD, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  fetchScheduleTraces(id: number, body?: QueryObjectsType): Observable<any> {
    if (body == null) {
      body = {
        offset: 0,
        limit: 200
      };
    }
    const url = CommonFunc.prepareUrl(API_SCHEDULE_TRACES, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  fetchTraceFiles(traceId: number): Observable<any> {
    let body = {};
    const url = CommonFunc.prepareUrl(API_GET_TRACE_FILES, { traceId });
    return this.baseService.getData(url, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  loadSchedule(id: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_LOAD_SCHEDULE, { id });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  reSchedule(schId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_RE_SCHEDULE, { schId });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  unSchedule(schId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_UN_SCHEDULE, { schId });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  updateSchedules(schedules: any[]): Observable<any> {
    let body = {
      data: schedules
    };
    return this.baseService.putData(API_UPDATE_SCHEDULES, body).pipe(tap(resp => {}, err => {}));
  }

  deleteSchedule(schId: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DELETE_SCHEDULE, { schId });
    return this.baseService.deleteData(url).pipe(tap(resp => {}, err => {}));
  }
}
