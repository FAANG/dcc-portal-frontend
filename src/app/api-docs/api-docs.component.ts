import { Component, OnInit } from '@angular/core';
import { SwaggerUIBundle } from 'swagger-ui-dist';
import { HostSetting } from '../services/host-setting'

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css']
})
export class ApiDocsComponent implements OnInit {
  hostSetting = new HostSetting;

  constructor() { }

  ngOnInit() {
    const ui = SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      url: this.hostSetting.host + 'swagger.json'
    });
  }

}
