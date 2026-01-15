import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-validation-beta',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './validation-beta.component.html',
  styleUrl: './validation-beta.component.css'
})
export class ValidationBetaComponent {
  betaUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.betaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://faang-validator-frontend-964531885708.europe-west2.run.app/'
    );
  }
}
