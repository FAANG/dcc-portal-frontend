import { TestBed } from '@angular/core/testing';

import { OntologyService } from './ontology.service';

describe('OntologyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntologyService = TestBed.get(OntologyService);
    expect(service).toBeTruthy();
  });
});
