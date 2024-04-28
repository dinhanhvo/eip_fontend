import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpHeaders } from '@angular/common/http';
const API_DOWNLOAD: string = '/download';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private baseService: BaseService) {}

  public download(file: String, exportName: String) {
    let data = {
      file: file,
      name: exportName,
      contentType: 'application/explorer',
      type: 'export',
      delete: 'true'
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'arraybuffer'
    };
    return this.baseService.postData(API_DOWNLOAD, data, options).pipe(tap(data => {}, error => {}));
  }
}
