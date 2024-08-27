import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {provideNgcCookieConsent} from 'ngx-cookieconsent';
import { cookieConfig } from './app.component';
import {provideAnimations} from "@angular/platform-browser/animations";
import {NgxSmartModalModule} from "ngx-smart-modal";
import {IMAGE_CONFIG} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideNgcCookieConsent(cookieConfig),
    provideAnimations(),
    importProvidersFrom(NgxSmartModalModule.forRoot()),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ]
};
