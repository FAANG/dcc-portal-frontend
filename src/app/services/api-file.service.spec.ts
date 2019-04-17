import { TestBed, inject } from '@angular/core/testing';

import { ApiFileService } from './api-file.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ApiFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiFileService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ApiFileService], (service: ApiFileService) => {
    expect(service).toBeTruthy();
  }));
});
