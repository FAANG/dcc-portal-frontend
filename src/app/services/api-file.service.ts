import { Injectable } from '@angular/core';
import { HostSetting } from './host-setting';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError} from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {DatasetTable, FileTable, OrganismTable, SpecimenTable} from '../shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiFileService {
  hostSetting = new HostSetting;

  constructor(private http: HttpClient) { }

  getAllFiles(query: any, size: number) {
    const url = this.hostSetting.host + 'file/' + '_search' + '?size=' + size;
    return this.http.post(url, query).pipe(
      map((data: any) => {
        return data.hits.hits.map(entry => ({
          fileName: entry['_id'],
          study: entry['_source']['study']['accession'],
          experiment: entry['_source']['experiment']['accession'],
          species: entry['_source']['species']['text'],
          assayType: entry['_source']['experiment']['assayType'],
          specimen: entry['_source']['specimen'],
          instrument: entry['_source']['run']['instrument'],
          standard: entry['_source']['experiment']['standardMet']
          } as FileTable )
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getFile(fileId: string) {
    const url = this.hostSetting.host + 'file/' + fileId;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getFilesByRun(runId: string) {
    const url = this.hostSetting.host + 'file/' + '_search';
    return this.http.post<any>(url, {
      'query': {
        'filtered': {
          'filter': {
            'term': {'run.accession' : runId}
          }
        }
      },
      'sort': [
        {'name': 'asc'}
      ]
    }).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllOrganisms(query: any, size: number) {
    const url = this.hostSetting.host + 'organism/' + '_search' + '?size=' + size;
    return this.http.post(url, query).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          standard: entry['_source']['standardMet']
        } as OrganismTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getOrganism(biosampleId: string) {
    const url = this.hostSetting.host + 'organism/' + biosampleId;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getOrganismsSpecimens(biosampleId: string) {
    const url = this.hostSetting.host + 'specimen/' + '_search';
    return this.http.post<any>(url, {
      'query': {
        'filtered': {
          'filter': {
            'term': {'organism.biosampleId' : biosampleId}
          }
        }
      },
      'sort': [
        {'name': 'asc'}
      ],
      'size': 1000000,
    }).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSpecimens(query: any, size: number) {
    const url = this.hostSetting.host + 'specimen/' + '_search' + '?size=' + size;
    return this.http.post(url, query).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: entry['_source']['material']['text'],
          organismpart_celltype: entry['_source']['cellType']['text'],
          sex: entry['_source']['organism']['sex']['text'],
          organism: entry['_source']['organism']['organism']['text'],
          breed: entry['_source']['organism']['breed']['text'],
          standard: entry['_source']['standardMet']
          } as SpecimenTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimen(biosampleId: string) {
    const url = this.hostSetting.host + 'specimen/' + biosampleId;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimenFiles(biosampleId: string) {
    const url = this.hostSetting.host + 'file/' + '_search';
    console.log(url);
    return this.http.post<any>(url, {
      'query': {
        'filtered': {
          'filter': {
            'term': {'specimen': biosampleId}
          }
        }
      },
      'sort': [
        {'run.accession': 'asc'},
        {'name': 'asc'}
      ],
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDatasets(query: any, size: number) {
    const url = this.hostSetting.host + 'dataset/' + '_search' + '?size=' + size;
    return this.http.post(url, query).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          datasetAccession: entry['_source']['accession'],
          title: entry['_source']['title'],
          species: entry,
          archive: entry['_source']['archive'],
          assayType: entry['_source']['assayType'],
          numberOfExperiments: entry['_source']['experiment']['length'],
          numberOfSpecimens: entry['_source']['specimen']['length'],
          numberOfFiles: entry['_source']['file']['length'],
          standard: entry['_source']['standardMet']
          } as DatasetTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getDataset(accession: string) {
    const url = this.hostSetting.host + 'dataset/' + accession;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
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
