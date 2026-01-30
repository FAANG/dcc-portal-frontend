import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-validation-beta',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './validation-beta.component.html',
  styleUrl: './validation-beta.component.css'
})
export class ValidationBetaComponent implements OnInit, OnDestroy {
  betaUrl: SafeResourceUrl;
  private messageListener: any;
  private isBrowser: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.betaUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Get the tab from route data
    this.route.data.subscribe(data => {
      const tab = data['tab'] || 'samples';
      const dashUrl = `https://faang-validator-frontend-964531885708.europe-west2.run.app/?tab=${tab}`;
      this.betaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dashUrl);
    });

    // Only add message listener in browser
    if (this.isBrowser) {
      this.messageListener = (event: MessageEvent) => {
        if (event.origin !== 'https://faang-validator-frontend-964531885708.europe-west2.run.app') {
          return;
        }

        if (event.data && event.data.type === 'TAB_CHANGE') {
          const newTab = event.data.tab;
          this.updateAngularRoute(newTab);
        }
      };

      window.addEventListener('message', this.messageListener);
    }
  }

  ngOnDestroy() {
    // Only remove listener in browser
    if (this.isBrowser && this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private updateAngularRoute(tab: string) {
    const routeMap: { [key: string]: string } = {
      'samples': '/validation/samples',
      'experiments': '/validation/experiments',
      'analysis': '/validation/analyses'
    };

    const newRoute = routeMap[tab];
    if (newRoute && this.router.url !== newRoute) {
      this.router.navigateByUrl(newRoute);
    }
  }
}
