import { Injectable } from '@angular/core';
import { HostSetting } from './host-setting';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { validation_service_url } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OntologyService {
  hostSetting = new HostSetting;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const url = validation_service_url + '/ontology_improver/auth/';
    let auth = 'Basic ' + btoa(username + ':' + password);
    return this.http.post(url, {'auth': auth}).pipe(
      map((data: any) => {
        return data.token;
      }),
      catchError(this.handleError),
    );
  }

  register(userData) {
    const url = validation_service_url + '/ontology_improver/register/';
    return this.http.post(url, userData).pipe(
      map((data: any) => {
        return data.user_id;
      }),
      catchError(this.handleRegError),
    );
  }

  private handleRegError(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }

  getOntologyById(ontologyId) {
    const url = validation_service_url + '/ontology_improver/ontology_detail/' + ontologyId;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  searchTerms(terms: any) {
    const url = `${this.hostSetting.host}data/ontologies/_search/?size=10000`;
    const filters = {"term":terms};
    const params = new HttpParams().set('_source', 'term,type,id,projects,tags,species')
      .set('filters', JSON.stringify(filters)).set('from_', 0);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        let res = data.hits.hits.map(entry => entry['_source']);
        return res;
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
  
  validateTerms(body: any) {
    const url = validation_service_url + '/ontology_improver/validate/';
    return this.http.post(url, body).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  createUpdateOntologies(body: any) {
    const url = validation_service_url + '/ontology_improver/update_ontologies/';
    return this.http.post(url, body).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  getSpecies() {
    const url = `${this.hostSetting.host}data/ontologies/_search/?size=10000`;
    const filters = {"type":["species"]};
    const params = new HttpParams().set('_source', 'term,type').set('filters', JSON.stringify(filters)).set('from_', 0);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        let res = data.hits.hits.map(entry => entry['_source']['term']
        );
        return res;
      }),
      catchError(this.handleError),
    );
  }

  getTypes() {
    const url = `${this.hostSetting.host}data/ontologies/_search/?size=10000`;
    const params = new HttpParams().set('_source', 'type').set('from_', 0);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        let types = [];
        data.hits.hits.forEach(record => {
          types = types.concat(record['_source']['type']);
          types = Array.from(new Set(types));
        });
        return types;
      }),
      catchError(this.handleError),
    );
  }

  getSynonyms(id) {
    const url = `https://www.ebi.ac.uk/ols4/api/terms?short_form=${id}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        if (data['_embedded']) {
          data = data['_embedded']['terms'][0];
          if (data['synonyms']) {
            return data['synonyms'];
          }
          if (data['annotation'] && data['annotation']['has_exact_synonym']) {
            return data['annotation']['has_exact_synonym'];
          }
        }
        return [];
      }),
      catchError(this.handleError),
    );
  }

  getUsageStatistics() {
    const url = `${this.hostSetting.host}data/summary_ontologies/_search/?size=10`;
    return this.http.get(url).pipe(
      map((data: any) => {
        let res = data.hits.hits.map(entry => entry['_source']);
        return res;
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
