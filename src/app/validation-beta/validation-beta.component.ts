import { Component, OnInit, OnDestroy, afterNextRender } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validation-beta',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './validation-beta.component.html',
  styleUrl: './validation-beta.component.css'
})
export class ValidationBetaComponent implements OnInit, OnDestroy {
  betaUrl: SafeResourceUrl;
  private messageListener: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.betaUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

    // afterNextRender ONLY runs in browser, never on SSR
    afterNextRender(() => {
      console.log('[Angular] 🌐 afterNextRender - We are in the BROWSER!');
      this.setupMessageListener();
    });
  }

  ngOnInit() {
    console.log('[Angular] ngOnInit called');

    this.route.data.subscribe(data => {
      const tab = data['tab'] || 'samples';
      console.log('[Angular] Route tab:', tab);

      const dashUrl = `http://0.0.0.0:8050/?tab=${tab}`;
      this.betaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dashUrl);
    });
  }

  private setupMessageListener() {
    console.log('[Angular] ✅ Setting up message listener in BROWSER');

    this.messageListener = (event: MessageEvent) => {
      console.log('[Angular] 📨 Message received:', event.data, 'from:', event.origin);

      if (event.origin !== 'http://0.0.0.0:8050') {
        console.log('[Angular] ❌ Wrong origin');
        return;
      }

      if (event.data?.type === 'TAB_CHANGE') {
        console.log('[Angular] ✅ Tab change to:', event.data.tab);
        this.updateAngularRoute(event.data.tab);
      }
    };

    window.addEventListener('message', this.messageListener);
    console.log('[Angular] ✅ Message listener added to window');
  }

  ngOnDestroy() {
    if (this.messageListener && typeof window !== 'undefined') {
      window.removeEventListener('message', this.messageListener);
      console.log('[Angular] Listener removed');
    }
  }

  private updateAngularRoute(tab: string) {
    const routeMap: { [key: string]: string } = {
      'samples': '/validation/samples',
      'experiments': '/validation/experiments',
      'analysis': '/validation/analyses'
    };

    const newRoute = routeMap[tab];
    console.log('[Angular] 🚀 Navigating:', this.router.url, '→', newRoute);

    if (newRoute && this.router.url !== newRoute) {
      this.router.navigateByUrl(newRoute);
    }
  }
}
