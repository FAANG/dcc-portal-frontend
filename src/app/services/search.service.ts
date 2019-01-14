import { Injectable } from '@angular/core';
import {of, Subject, throwError} from 'rxjs';
import {HostSetting} from './host-setting';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchText$ = new Subject<string>();
  hostSetting = new HostSetting;
  clicked = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  search(type: string, text: any, clicked: boolean) {
    if (type === 'file') {
      return this.searchFile(text, clicked);
    } else if (type === 'organism') {
      return this.searchOrganism(text, clicked);
    } else if (type === 'specimen') {
      return this.searchSpecimen(text, clicked);
    } else if (type === 'dataset') {
      return this.searchDataset(text, clicked);
    }
  }

  searchFile(text: any, clicked: boolean) {
    const host = this.hostSetting.host + 'file/' + '_search/';
    if (!text.trim()) { return of([]); }
    const query = {
      'bool': {
        'must': {
          multi_match: {
            query: text,
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
    if (clicked === true) {
      query['bool']['filter'] = {
        'term' : {'experiment.standardMet' : 'FAANG'}
      };
    }
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = query;
    return this.http.post(host, body).pipe(
      catchError(this.handleError),
    );
  }

  searchOrganism(text: any, clicked: boolean) {
    const host = this.hostSetting.host + 'organism/' + '_search/';
    if (!text.trim()) { return of([]); }
    const query = {
      'bool': {
        'must': {
          multi_match: {
            query: text,
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
    if (clicked === true) {
      query['bool']['filter'] = {
        'term' : {'standardMet' : 'FAANG'}
      };
    }
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = query;
    return this.http.post(host, body).pipe(
      catchError(this.handleError),
    );
  }

  searchSpecimen(text: any, clicked: boolean) {
    const host = this.hostSetting.host + 'specimen/' + '_search/';
    if (!text.trim()) { return of([]); }
    const query = {
      'bool': {
        'must': {
          multi_match: {
            query: text,
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
    if (clicked === true) {
      query['bool']['filter'] = {
        'term' : {'standardMet' : 'FAANG'}
      };
    }
    const body = {
      from: 0,
      size: 100,
    };
    body['query'] = query;
    return this.http.post(host, body).pipe(
      catchError(this.handleError),
    );
  }

  searchDataset(text: any, clicked: boolean) {
    const host = this.hostSetting.host + 'dataset/' + '_search/';
    if (!text.trim()) { return of([]); }
    const query = {
      'bool': {
        'must': {
          multi_match: {
            query: text,
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
    if (clicked === true) {
      query['bool']['filter'] = {
        'term' : {'standardMet' : 'FAANG'}
      };
    }
    let body = {
      from: 0,
      size: 100,
    };
    body['query'] = query;
    return this.http.post(host, body).pipe(catchError(
      this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network errorSubject occurred. Handle it accordingly.
      console.error('An errorSubject occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing errorSubject message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
