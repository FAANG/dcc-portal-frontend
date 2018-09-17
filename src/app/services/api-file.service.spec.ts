import { TestBed, inject } from '@angular/core/testing';

import { ApiFileService } from './api-file.service';

describe('ApiFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFileService]
    });
  });

  it('should be created', inject([ApiFileService], (service: ApiFileService) => {
    expect(service).toBeTruthy();
  }));
});
