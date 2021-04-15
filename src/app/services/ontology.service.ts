import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HostSetting } from './host-setting';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { validation_service_url } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OntologyService {
  hostSetting = new HostSetting;

  constructor(private http: HttpClient, private _userService: UserService) { }

  searchTerms(terms: any) {
    const url = validation_service_url + '/ontology_improver/search/';
    return this.http.post(url, {'terms': terms}).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }
  
  fetchZoomaMatches(terms: any) {
    const url = validation_service_url + '/ontology_improver/get_matches/';
    return this.http.post(url, {'terms': terms}).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }
  
  validateTerms(terms: any) {
    const url = validation_service_url + '/ontology_improver/validate/';
    return this.http.post(url, {'terms': terms}).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }
  
  getAllOntologies(terms: any) {
    const url = validation_service_url + '/ontology_improver/get_ontologies/';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
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
