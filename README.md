[![Build Status](https://travis-ci.org/FAANG/faang-portal-frontend.svg?branch=master)](https://travis-ci.org/FAANG/faang-portal-frontend)

# FaangPortalFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Design features
App has 7 main routes (that you can find inside app-routing.module.ts):
1. Home route (home component)
2. Organisms route (organism component)
3. Specimens route (specimen component)
4. Datasets route (dataset component)
5. Files route (file component)
6. Search route (search component)
7. Help route (help component)

Inside folder of each component you can find detail component (file-detail component for example).

Also project contains pipes, services and shared folders for pipes, services and shared components respectively.
Each component fetches data from the server only upon creation and then all basic functionality (sorting, filtering, etc...) goes on using pipes
sort.pipe.ts and filter.pipe.ts for sorting and filtering respectively.

## Future plans
1. Add comprehensive test suite
2. Pre-render application on the fly from the server using Angular Universal
2. Add offline capabilities with Service Workers

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
