import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AuthenticationService } from '../_services';
import { AppStoreService } from '../shared';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        // private authenticationService: AuthenticationService
        private appStore: AppStoreService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = this.appStore.getAuth()['token'];
        console.log('JwtInterceptor current session token', token);
        // let currentUser = this.authenticationService.currentUserValue;
        // if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${currentUser.token}`
                    Authorization: 'Bearer ' + token
                }
            });
        // }

        return next.handle(request);
    }
}