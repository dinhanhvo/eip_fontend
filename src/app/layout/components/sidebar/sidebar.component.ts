import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../../../router.animations';
import {LoginService} from '../../../shared';
import {Role, User} from '../../../shared/model/user';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [routerTransition()]
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    showMenu: string = 'publication';
    pushRightClass: string = 'push-right';

    currentUser: User = {};

    constructor(private translate: TranslateService,
                private logginService: LoginService,
                public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.logginService.getMe().subscribe(
            data => {
                this.currentUser = data;
                console.log('-------------currentUser: ', this.currentUser);
                }, error => {
                        console.log('-------------currentUser: error');
            }
        );
    }

    isPermission(roleName: string): boolean {
        if (this.currentUser === undefined || this.currentUser.roles === undefined) {
            return false;
        }
        let ok = false;
        let roles: Role[] = [];
        roles = this.currentUser.roles.filter(r => r.name === roleName);
        ok = roles.length > 0;
        // console.log('---------- check permission: ', ok);
        return ok;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
        sessionStorage.setItem('lang', language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}