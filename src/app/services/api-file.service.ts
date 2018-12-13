import { Injectable } from '@angular/core';
import { HostSetting } from './host-setting';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
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
    const url = this.hostSetting.host + 'file/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
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

  getFilesByRun(runId: any) {
    const url = this.hostSetting.host + 'file/_search/?q=run.accession:' + runId + '&sort=name:asc';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getFilesExperiment(experimentId: string) {
    const url = this.hostSetting.host + 'experiment/_search?q=_id:' + experimentId;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllOrganisms(query: any, size: number) {
    const url = this.hostSetting.host + 'organism/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          standard: entry['_source']['standardMet'],
          idNumber: +entry['_source']['id_number'],
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

  getOrganismsSpecimens(biosampleId: any) {
    const url = this.hostSetting.host + 'specimen/_search/?q=organism.biosampleId:' + biosampleId + '&sort=id_number:desc' + '&size=100000';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSpecimens(query: any, size: number) {
    const url = this.hostSetting.host + 'specimen/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: this.checkField(entry['_source']['material']),
          organismpart_celltype: this.checkField(entry['_source']['cellType']),
          sex: this.checkField(entry['_source']['organism']['sex']),
          organism: this.checkField(entry['_source']['organism']['organism']),
          breed: this.checkField(entry['_source']['organism']['breed']),
          standard: entry['_source']['standardMet'],
          idNumber: +entry['_source']['id_number'],
          } as SpecimenTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  // Todo preserve JSON structure on backend part
  private checkField(field: any) {
    if (typeof field !== 'undefined') {
      return field['text'];
    } else {
      return '';
    }
  }

  getSpecimen(biosampleId: string) {
    const url = this.hostSetting.host + 'specimen/' + biosampleId;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimenFiles(biosampleId: any) {
    const url = this.hostSetting.host + 'file/_search/?q=specimen:' + biosampleId + '&size=100000' + '&sort=run.accession:asc,name:asc';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDatasets(query: any, size: number) {
    const url = this.hostSetting.host + 'dataset/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString());
    return this.http.get(url, {params: params}).pipe(
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
      console.error(error);
    }
    // return an observable with a user-facing errorSubject message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
