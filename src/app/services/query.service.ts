import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  query_language_url = 'https://api.faang.org/query';
  downloading = false;

  constructor(private http: HttpClient) { }

  getAllColumns() {
    let url = this.query_language_url + '/columns';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  getRecords(indices, fields, from, sort, project) {
    if (indices.length == 1) {
      let params = new HttpParams({
        fromObject: { 'indices': indices }
      }).set('_source', fields).set('from_', from).set('size', '10').set('sort', sort);
      if (project) {
        params = params.set('q', 'secondaryProject:' + project);
      }
      let url = this.query_language_url + '/search';
      return this.http.get(url, { params: params }).pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError),
      );
    }
    else if (indices.length == 2) {
      if (sort.length) {
        sort = sort.split(':');
        sort[0] = sort[0] + '.keyword';
        sort = sort.join(':');
      }
      let params = new HttpParams({
        fromObject: { 'index1': indices[0], 'index2': indices[1] }
      }).set('_source', fields).set('from_', from).set('size', '10').set('sort', sort);
      if (project) {
        params = params.set('q', 'secondaryProject:' + project);
      }
      let url = this.query_language_url + '/join_search';
      return this.http.get(url, { params: params }).pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError),
      );
    }
  }

  downloadCsv(indices, fields, sort, project, fileFormat, accession) {
    let params = new HttpParams({
      fromObject: { 'indices': indices }
    }).set('_source', fields).set('sort', sort).set('file_format', fileFormat);
    if (project) {
      params = params.set('q', 'secondaryProject:' + project);
    }
    if (accession) {
      params = params.append('q', 'accession:' + accession);
    }
    const url = this.query_language_url + '/download';
    this.downloading = true;
    this.http.get(url, { params: params, responseType: 'blob' }).subscribe(
      (response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', `data.${fileFormat}`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.downloading = false;
      }
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
