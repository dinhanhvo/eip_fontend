# Gettting started
# deploy to tomcat
1. ng build --prod --base-href .
2. copy * to $tomcat/webapp/nhixuan
3. copy assets to $tomcat/webapp/ad-dashboard
# Backend
1. remove springboot dependence, edit port in application.propeties to 8080
2. edit jar to war
3. mvn package and copy to webapp
4. config app.json to correct api path ex: localhost:8080/nhixuan-0.0.1/api

## Settings with Visual Studio Code

Steps to setup code formatter for Visual Studio Code

- Install extension of VSCode: Prettier - Code formatter (esbenp.prettier-vscode)
- Edit workspace settings:

```
{
  "editor.formatOnSave": true
}
```

# SB Admin rewritten in Angular6 and Bootstrap 4

Simple Dashboard Admin App built using Angular 6 and Bootstrap 4

This project is a port of the famous Free Admin Bootstrap Theme [SB Admin v6.0](http://startbootstrap.com/template-overviews/sb-admin-2/) to Angular5 Theme.

Powered by [StartAngular](http://startangular.com/) & [StrapUI](http://strapui.com/)

## [Demo](http://rawgit.com/start-angular/SB-Admin-BS4-Angular-6/master/dist/)

## [SB Admin Material version](https://github.com/start-javascript/sb-admin-material)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

### Introduction

Provides fast, reliable and extensible starter for the development of Angular projects.

`sb-admin-bs4-angular5` provides the following features:

- Developed using boostrap-v4.0.0
- angular-v6.0.0
- angular/cli-v6.0.0
- [ng-bootstrap-v2.0.0](https://github.com/ng-bootstrap/)
- [ngx-translate-v10.0.0](https://github.com/ngx-translate)
- Following the best practices.
- Ahead-of-Time compilation support.
- Official Angular i18n support.
- Production and development builds.
- Tree-Shaking production builds.

### How to start

**Note** that this seed project requires **node >=v6.9.0 and npm >=3**.

In order to start the project use:

```bash
$ git clone https://github.com/start-angular/SB-Admin-BS4-Angular-5
$ cd SB-Admin-BS4-Angular-5
# install the project's dependencies
$ npm install
# watches your files and uses livereload by default run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
$ npm start
# prod build, will output the production application in `dist`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build
```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
