import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  query_language_url = 'http://127.0.0.1:8000';

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
  
  getRecords(indices, fields, from, sort) {
    const params = new HttpParams({ 
      fromObject: { 'indices': indices } 
    }).set('_source', fields).set('from_', from).set('size', '10').set('sort', sort);
    let url = this.query_language_url + '/search';
    return this.http.get(url, { params: params }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  downloadCsv(indices, fields, sort) {
    const params = new HttpParams({ 
      fromObject: { 'indices': indices } 
    }).set('_source', fields).set('sort', sort);
    let url = this.query_language_url + '/download';
    this.http.get(url, { params: params, responseType: 'blob' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'data.csv');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
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
