import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseService } from './base.service';
import { CommonFunc } from '../utils/common-func';

const API_MASS_SCHEDULE_BY_DASHBOARD: string = '/dashboards/:id/mpschedules';
// const API_MASS_SCHEDULE_BY_DASHBOARD: string = '/mpschedules/dashboadId/:id';
const API_MASS_SCHEDULE: string = '/me/mpschedules';
const API_MASS_SCHEDULES_PARAM: string = '/mpschedules/:id/param';
const API_CHILD_SCHEDULES: string = '/mpschedules/:id/child';
const API_CHILD_SCHEDULES_PARAM: string = '/mpschedules/child/:id/param';
const API_MASS_SCHEDULES_DELETE: string = '/mpschedules/:id';
const API_MASS_SCHEDULES_PAUSE: string = '/mpschedules/pause/:id';
const API_MASS_SCHEDULES_UNSCHEDULE: string = '/mpschedules/unschedule/:id';
const API_MASS_SCHEDULES_SCHEDULE: string = '/mpschedules/schedule/:id';
const API_MASS_SCHEDULES_RESUME: string = '/mpschedules/resume/:id';
const API_MASS_SCHEDULES_RESCHEDULE: string = '/mpschedules/reschedule/:id';
const API_MASS_SCHEDULES_CANCEL: string = '/mpschedules/cancel/:id';
const API_MASS_SCHEDULES_VIEW_ERROR: string = '/mpschedules/view-error/:id';
const API_MASS_RЕSCHEDULES_FAILED_BUTTON_STATUS: string = '/mpschedules/reschedule-failed-button-status/:id';
const API_MASS_DOWNLOAD_BUTTON_STATUS: string = '/mpschedules/download-button-status/:id';
const API_MASS_VIEW_ERROR_BUTTON_STATUS: string = '/mpschedules/view-error-button-status/:id';
const API_UPDATE_MP_SCHEDULES: string = '/mpschedule/update';
const API_LOAD_MP_SCHEDULE: string = '/mpschedules/:id';
const API_MP_TRACES: string = '/mpschedules/:id/traces';
const API_MP_UPDATE_STATUS: string = '/mpschedules/:id/update-status';
const API_MP_RESCHEDULE_FAILED: string = '/mpschedules/:id/reschedule-failed';

const DEFAULT_MY_MASS_SCHEDULES_BODY: Object = {
  fields: 'id,name,createdBy,updatedBy,updatedDate',
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-createdDate'
};

const DEF_MP_TRACES_BODY: Object = {
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-startDate'
};

@Injectable({
  providedIn: 'root'
})
export class MpScheduleService {
  constructor(private baseService: BaseService) {}

  fetchMpSchedules(): Observable<any>;
  fetchMpSchedules(body: any): Observable<any>;
  fetchMpSchedules(body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    const newBody = { ...DEFAULT_MY_MASS_SCHEDULES_BODY, ...body };

    return this.baseService.postData(API_MASS_SCHEDULE, newBody).pipe(
      tap(
        resp => {
          // console.log('mass-schedule-service: got response data', resp);
        },
        error => {
          // console.log('mass-schedule-service: failed to fetch mass-schedules', error);
        }
      )
    );
  }

  fetchMpTraces(id, body?: any): Observable<any> {
    if (body == null || body == undefined) {
      body = {};
    }
    const newBody = { ...DEF_MP_TRACES_BODY, ...body };
    let url = CommonFunc.prepareUrl(API_MP_TRACES, { id });
    return this.baseService.postData(url, newBody).pipe(tap(resp => {}, error => {}));
  }

  fetchMpSchedulesByDashboardId(id: number, body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    // console.log(id);
    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULE_BY_DASHBOARD, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  getMpScheduleParamById(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_PARAM, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  getChildScheduleByMpScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_CHILD_SCHEDULES, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  getChildScheduleParamById(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_CHILD_SCHEDULES_PARAM, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  loadMpSchedule(id: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_LOAD_MP_SCHEDULE, { id });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  deleteMPSchedule(id: number) {
    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_DELETE, { id });
    return this.baseService.deleteData(url);
  }

  pauseMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_PAUSE, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  unscheduleMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_UNSCHEDULE, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  scheduleMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_SCHEDULE, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  resumeMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_RESUME, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  rescheduleMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_RESCHEDULE, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  cancelMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_CANCEL, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  viewErrorMPScheduleId(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_SCHEDULES_VIEW_ERROR, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  rescheduleFailedButtonStatus(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_RЕSCHEDULES_FAILED_BUTTON_STATUS, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  downloadButtonStatus(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_DOWNLOAD_BUTTON_STATUS, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  isViewErrorDisabled(id: number, body?: any) {
    if (body == null) {
      body = {};
    }

    const url = CommonFunc.prepareUrl(API_MASS_VIEW_ERROR_BUTTON_STATUS, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  updateMpSchedule(mpSch: any): Observable<any> {
    let body = {
      data: [mpSch]
    };
    return this.baseService.putData(API_UPDATE_MP_SCHEDULES, body).pipe(tap(resp => {}, err => {}));
  }

  updateMpStatus(id: number, newStat: string): Observable<any> {
    let body = {
      data: {
        status: newStat
      }
    };
    let url = CommonFunc.prepareUrl(API_MP_UPDATE_STATUS, { id });
    return this.baseService.postData(url, body);
  }

  rescheduleFailed(id: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_MP_RESCHEDULE_FAILED, { id });
    return this.baseService.postData(url, body);
  }
}
