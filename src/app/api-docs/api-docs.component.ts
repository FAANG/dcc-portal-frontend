import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { SwaggerUIBundle } from 'swagger-ui-dist';
import { HeaderComponent } from '../shared/header/header.component';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css'],
  standalone: true,
  imports: [HeaderComponent]
})
export class ApiDocsComponent implements OnInit {
  isBrowser = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const ui = SwaggerUIBundle({
        dom_id: '#swagger-ui',
        layout: 'BaseLayout',
        presets: [
          SwaggerUIBundle.presets.apis,
        ],
        url: 'https://api.faang.org/data/' + 'swagger.json',
        tagsSorter: 'alpha',
        responseInterceptor: this.modifyResponse
      });
    }
  }

  modifyResponse(res: {[index: string]: any}) {
    if (res['headers']['content-type'] === 'application/pdf' || res['headers']['content-type'] === 'text/plain') {
      const filename = res['url'].split('/').slice(-1)[0];
      res['headers']['Content-Disposition'] = ' attachment; filename=' +  filename;
    }
  }

}
