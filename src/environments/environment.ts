// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // host: 'http://wp-np3-e3:9200/'
  // host: 'http://ves-hx-e4:9200/faang_build_2/'
  host: 'https://api.faang.org/',
  relatedProjectsHost: 'https://raw.githubusercontent.com/FAANG/comm-data-portal-projects/master/projects/'
};

/*
 * In development mode, for easier debugging, you can ignore zone related errorSubject
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/plugins/zone-errorSubject';  // Included with Angular CLI.
