import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: Object = null;
  private version: Object = null;
  private envConfig: Object = null;

  constructor(private http: HttpClient) { }

  /**
   * Get configuration value.
   * @param key config key
   */
  public getConfig(key: any) {
    return this.config[key];
  }

  public getVersion() {
    return this.version;
  }

  public getDebugMode() {
    return this.envConfig['debug'];
  }

  /**
   * This method:
   *   1) Load "app.jsp" to get the configuration object.
   */
  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('loading application config. env', environment);
      this.http.get(environment.contextPath + '/assets/app.json').subscribe(res => {
        console.log('Got application json', res);
        this.config = res;
        resolve(res);
      });
      this.version = '1.0.0';
      this.http.get(environment.contextPath + '/assets/version.json').subscribe(res => {
        console.log('Got application version', res);
        this.version = res;
      });
      this.http.get(environment.contextPath + '/assets/env-config.json').subscribe(res => {
        console.log('Got env config:', res);
        this.envConfig = res;
      });
    });
  }
}
