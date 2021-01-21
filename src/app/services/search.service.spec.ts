import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { defer, of as observableOf } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';
import { subscribeOn } from 'rxjs/operators';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('SearchService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let searchService: SearchService;
  const host = 'http://data.faang.org/api/';
  const expectedRecords = [{id: 1, name: 'recordA'}, {id: 2, name: 'recordB'}];
  const fileQuery = {
    'bool': {
      'must': {
        multi_match: {
          query: 'scrofa',
          fields: [
            'study.accession',
            'experiment.accession',
            'specimen.std',
            'organism.std',
            'species.text.autocomp',
            'name',
            'url.keywords'
          ],
        }
      }
    }
  };
  const organismQuery = {
    'bool': {
      'must': {
        multi_match: {
          query: 'scrofa',
          fields: [
            'biosampleId.std',
            'alternativeId.std',
            'name.std',
            'sameAs.std',
            'description.std',
            'organism.text.autocomp',
            'sex.text.autocomp',
            'breed.text.autocomp',
            'healthStatus.text.autocomp',
            'organization.name.std'
          ],
        }
      }
    }
  };
  const specimenQuery = {
    'bool': {
      'must': {
        multi_match: {
          query: 'scrofa',
          fields: [
            'biosampleId.std',
            'alternativeId.std',
            'name.std',
            'description.std',
            'sameAs.std',
            'derivedFrom.std',
            'organization.name.std',
            'specimenFromOrganism.developmentalStage.text.autocomp',
            'specimenFromOrganism.healthStatusAtCollection.text.autocomp',
            'specimenFromOrganism.organismPart.text.autocomp',
            'organism.biosampleId.std',
            'organism.organism.text.autocomp',
            'organism.sex.text.autocomp',
            'organism.breed.text.autocomp',
            'organism.healthStatus.text.autocomp',
            'cellLine.organism.text.autocomp',
            'cellLine.sex.text.autocomp',
            'cellLine.breed.text.autocomp',
            'cellLine.cellLine.std',
            'cellLine.disease.autocomp',
          ],
        }
      }
    }
  };
  const datasetQuery = {
    'bool': {
      'must': {
        multi_match: {
          query: 'scrofa',
          fields: [
            'accession',
            'title.autocomp',
            'specimen.biosampleId.std',
            'specimen.cellType.autocomp',
            'specimen.breed.autocomp',
            'species.text.autocomp',
            'instrument.autocomp'
          ],
        }
      }
    }
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    searchService = new SearchService(<any> httpClientSpy);
  });

  it('should the expected type of records', () => {
    spyOn(searchService, 'searchFile').and.returnValue({id: 'file1'});
    searchService.search('file', 'file1', true);
    expect(searchService.searchFile).toHaveBeenCalledWith('file1', true);
    spyOn(searchService, 'searchOrganism').and.returnValue({id: 'organism1'});
    searchService.search('organism', 'organism1', true);
    expect(searchService.searchOrganism).toHaveBeenCalledWith('organism1', true);
    spyOn(searchService, 'searchSpecimen').and.returnValue({id: 'specimen1'});
    searchService.search('specimen', 'specimen1', true);
    expect(searchService.searchSpecimen).toHaveBeenCalledWith('specimen1', true);
    spyOn(searchService, 'searchDataset').and.returnValue({id: 'dataset1'});
    searchService.search('dataset', 'dataset1', true);
    expect(searchService.searchDataset).toHaveBeenCalledWith('dataset1', true);
  });

  it('should return empty observables', () => {
    searchService.searchFile(' ', true).subscribe((result) => {
      expect(result).toEqual({hits: { total: 0 }});
    });
    searchService.searchDataset(' ', true).subscribe((result) => {
      expect(result).toEqual({hits: { total: 0 }});
    });
    searchService.searchOrganism(' ', true).subscribe((result) => {
      expect(result).toEqual({hits: { total: 0 }});
    });
    searchService.searchSpecimen(' ', true).subscribe((result) => {
      expect(result).toEqual({hits: { total: 0 }});
    });
  });

  it('should return all expected files', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchFile('scrofa', false).subscribe(
      files => expect(files).toEqual(expectedRecords, 'expected files'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = fileQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'file/_search/', body]]);
  });

  it('should return only FAANG standard files', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchFile('scrofa', true).subscribe(
      files => expect(files).toEqual(expectedRecords, 'expected files'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    const excludeLegacyDataQuery = fileQuery;
    excludeLegacyDataQuery['bool']['filter'] = {
      'term' : {'experiment.standardMet' : 'FAANG'}
    };
    body['query'] = excludeLegacyDataQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'file/_search/', body]]);
  });

  it('should return an error when the server returns a 404 for files search', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    searchService.searchFile('scrofa', false).subscribe(
      files => fail('expected an error, not files'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });

  it('should return all expected organisms', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchOrganism('scrofa', false).subscribe(
      organisms => expect(organisms).toEqual(expectedRecords, 'expected organisms'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = organismQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'organism/_search/', body]]);
  });

  it('should return only FAANG standard organisms', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchOrganism('scrofa', true).subscribe(
      organisms => expect(organisms).toEqual(expectedRecords, 'expected organisms'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    const excludeLegacyDataQuery = organismQuery;
    excludeLegacyDataQuery['bool']['filter'] = {
      'term' : {'standardMet' : 'FAANG'}
    };
    body['query'] = excludeLegacyDataQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'organism/_search/', body]]);
  });

  it('should return an error when the server returns a 404 for organisms search', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    searchService.searchOrganism('scrofa', false).subscribe(
      files => fail('expected an error, not organisms'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });

  it('should return all expected specimens', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchSpecimen('scrofa', false).subscribe(
      specimens => expect(specimens).toEqual(expectedRecords, 'expected specimens'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = specimenQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'specimen/_search/', body]]);
  });

  it('should return only FAANG standard specimens', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchSpecimen('scrofa', true).subscribe(
      specimens => expect(specimens).toEqual(expectedRecords, 'expected specimens'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    const excludeLegacyDataQuery = specimenQuery;
    excludeLegacyDataQuery['bool']['filter'] = {
      'term' : {'standardMet' : 'FAANG'}
    };
    body['query'] = excludeLegacyDataQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'specimen/_search/', body]]);
  });

  it('should return an error when the server returns a 404 for specimens search', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    searchService.searchSpecimen('scrofa', false).subscribe(
      files => fail('expected an error, not organisms'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });

  it('should return all expected datasets', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchDataset('scrofa', false).subscribe(
      datasets => expect(datasets).toEqual(expectedRecords, 'expected datasets'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = datasetQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'dataset/_search/', body]]);
  });

  it('should return only FAANG standard datasets', () => {
    httpClientSpy.post.and.returnValue(asyncData(expectedRecords));
    searchService.searchDataset('scrofa', true).subscribe(
      datasets => expect(datasets).toEqual(expectedRecords, 'expected datasets'),
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    const body = {
      from: 0,
      size: 100,
    };
    const excludeLegacyDataQuery = datasetQuery;
    excludeLegacyDataQuery['bool']['filter'] = {
      'term' : {'standardMet' : 'FAANG'}
    };
    body['query'] = excludeLegacyDataQuery;
    expect(httpClientSpy.post.calls.allArgs()).toEqual([[host + 'dataset/_search/', body]]);
  });

  it('should return an error when the server returns a 404 for specimens search', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    searchService.searchDataset('scrofa', false).subscribe(
      files => fail('expected an error, not organisms'),
      error => expect(error).toEqual('Something bad happened; please try again later.')
    );
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
