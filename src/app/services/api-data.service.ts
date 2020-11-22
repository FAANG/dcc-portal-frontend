import { Injectable } from '@angular/core';
import { HostSetting } from './host-setting';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {
  ArticleTable, AnalysisTable, DatasetTable, FileTable, FileForProjectTable, OrganismTable, OrganismForProjectTable,
  ProtocolFile, ProtocolSample, SpecimenTable, SpecimenForProjectTable
} from '../shared/interfaces';
import {ruleset_prefix_old, ruleset_prefix_new, validation_service_url} from '../shared/constants';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  hostSetting = new HostSetting;

  constructor(private http: HttpClient) { }

  getAllFiles(query: any, size: number) {
    const url = this.hostSetting.host + 'file/' + '_search/' + '?size=' + size;
    let aggs = {
      'study': 'study.accession',
      'experiment': 'experiment.accession',
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'specimen': 'specimen',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished'
    }
    let filters = query['filters'];
    for (const prop in filters) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    query['sort'] = aggs[query['sort'][0]] ? aggs[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1]; 
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']);
    let res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map(entry => ({
          fileName: entry['_id'],
          study: entry['_source']['study']['accession'],
          experiment: entry['_source']['experiment']['accession'],
          species: entry['_source']['species']['text'],
          assayType: entry['_source']['experiment']['assayType'],
          target: entry['_source']['experiment']['target'],
          specimen: entry['_source']['specimen'],
          instrument: entry['_source']['run']['instrument'],
          standard: entry['_source']['experiment']['standardMet'],
          paperPublished: entry['_source']['paperPublished']
          } as FileTable )
        );
        res['totalHits'] = data.hits.total;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllFilesForProject(project: string) {
    const url = this.hostSetting.host + 'file/_search/?size=100000&q=secondaryProject:' + project;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          name: entry['_source']['name'],
          fileId: entry['_id'],
          experiment: entry['_source']['experiment']['accession'],
          assayType: entry['_source']['experiment']['assayType'],
          experimentTarget: entry['_source']['experiment']['target'],
          run: entry['_source']['run']['accession'],
          readableSize: entry['_source']['readableSize'],
          checksum: entry['_source']['checksum'],
          checksumMethod: entry['_source']['checksumMethod'],
          url: entry['_source']['url']
          } as FileForProjectTable )
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

  getExperimentByAccession(experimentId: string) {
    const url = this.hostSetting.host + 'experiment/' + experimentId;
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
            paperPublished: entry['_source']['paperPublished'],
        } as OrganismTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllOrganismsFromProject(project: string, mode: string) {
    const url = this.hostSetting.host + 'organism/_search/?size=100000&q=secondaryProject:' + project;
    // const url = `http://45.86.170.123/api/organism/${mode}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          private: entry['_source']['private']
        } as OrganismForProjectTable)
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

  getAllSpecimensForProject(project: string) {
    const url = this.hostSetting.host + 'specimen/_search/?size=100000&q=secondaryProject:' + project;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: this.checkField(entry['_source']['material']),
          organismpart_celltype: this.checkField(entry['_source']['cellType']),
          sex: this.checkField(entry['_source']['organism']['sex']),
          organism: this.checkField(entry['_source']['organism']['organism']),
          breed: this.checkField(entry['_source']['organism']['breed'])
          } as SpecimenForProjectTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSpecimens(query: any, size: number) {
    const url = this.hostSetting.host + 'specimen/' + '_search/' + '?size=' + size;
    let aggs = {
      'standard': 'standardMet',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished'
    }
    let filters = query['filters'];
    for (const prop in filters) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    query['sort'] = aggs[query['sort'][0]] ? aggs[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query['sort'][1]; 
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']).set('filters', JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']);
    let res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          material: this.checkField(entry['_source']['material']),
          organismpart_celltype: this.checkField(entry['_source']['cellType']),
          sex: this.checkField(entry['_source']['organism']['sex']),
          organism: this.checkField(entry['_source']['organism']['organism']),
          breed: this.checkField(entry['_source']['organism']['breed']),
          standard: entry['_source']['standardMet'],
          idNumber: entry['_source']['id_number'],
          paperPublished: entry['_source']['paperPublished']
          } as SpecimenTable)
        );
        res['totalHits'] = data.hits.total;
        res['aggregations'] = data.aggregations;
        return res;
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

  getSpecimenRelationships(biosampleId: any) {
    const url = this.hostSetting.host + 'specimen/_search/?q=allDeriveFromSpecimens:' + biosampleId +
      '&size=100000' + '&sort=biosampleId:asc';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDatasets(query: any, size: number) {
    const url = this.hostSetting.host + 'dataset/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          datasetAccession: entry['_source']['accession'],
          title: entry['_source']['title'],
          species: this.getSpeciesStr(entry),
          archive: entry['_source']['archive'].toString(),
          assayType: entry['_source']['assayType'].toString(),
          numberOfExperiments: entry['_source']['experiment']['length'],
          numberOfSpecimens: entry['_source']['specimen']['length'],
          numberOfFiles: entry['_source']['file']['length'],
          standard: entry['_source']['standardMet'],
          paperPublished: entry['_source']['paperPublished']
          } as DatasetTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpeciesStr(dataset: any): string {
    const species: any[] = dataset['_source']['species'];
    let value = '';
    for (let i = species.length - 1; i >= 0; i--) {
      value += species[i]['text'] + ',';
    }
    return value.substring(0, value.length - 1);
  }

  getDataset(accession: string) {
    const url = this.hostSetting.host + 'dataset/' + accession;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllAnalyses(query: any, size: number) {
    const url = this.hostSetting.host + 'analysis/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          accession: entry['_source']['accession'],
          datasetAccession: entry['_source']['datasetAccession'],
          title: entry['_source']['title'],
          species: entry['_source']['organism']['text'],
          assayType: entry['_source']['assayType'],
          analysisType: entry['_source']['analysisType'],
          standard: entry['_source']['standardMet']
          } as AnalysisTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAnalysesBySample(sampleId: any) {
    const url = this.hostSetting.host + 'analysis/_search/?q=sampleAccessions:' + sampleId + '&sort=accession:asc&size=10000';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAnalysesByDataset(accession: any) {
    const url = this.hostSetting.host + 'analysis/_search/?q=datasetAccession:' + accession + '&sort=accession:asc&size=10000';
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAnalysis(accession: string) {
    const url = this.hostSetting.host + 'analysis/' + accession;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllArticlesForProject(project: string) {
    const url = this.hostSetting.host + 'article/_search/?size=100000&q=secondaryProject:' + project;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          id: entry['_id'],
          title: entry['_source']['title'],
          year: entry['_source']['year'],
          journal: entry['_source']['journal'],
          datasetSource: entry['_source']['datasetSource']
          } as ArticleTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllArticles(query: any, size: number) {
    const url = this.hostSetting.host + 'article/' + '_search/' + '?size=' + size;
    // const url = 'wp-np3-e2:9200/faang_build_6_article/' + '_search/' + '?size=' + size;
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', query['sort']);
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map( entry => ({
          id: entry['_id'],
          title: entry['_source']['title'],
          year: entry['_source']['year'],
          journal: entry['_source']['journal'],
          datasetSource: entry['_source']['datasetSource']
          } as ArticleTable)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getArticle(id: string) {
    const url = this.hostSetting.host + 'article/' + id;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSamplesProtocols() {
    // const url = 'http://45.86.170.123/api/protocols_samples';
    const url = this.hostSetting.host + 'protocol_samples/_search/' + '?size=100';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hits.hits.map(entry => ({
          key: entry['_source']['key'],
          protocol_name: entry['_source']['protocolName'],
          university_name: entry['_source']['universityName'],
          protocol_date: entry['_source']['protocolDate'].toString(),
          } as ProtocolSample)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSampleProtocol(id: string) {
    const url = this.hostSetting.host + 'protocol_samples/' + id;
    // const url = `http://45.86.170.123/api/protocols_samples/${id}`;
    // const url = `http://wp-np3-e2:9200/protocols_samples/_search?q=_id:${id}`;
    return this.http.get(url).pipe(
      map( (data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllExperimentsProtocols(query: any) {
    const url = this.hostSetting.host + 'protocol_files/_search/' + '?size=100';
    const params = new HttpParams().set('_source', query['_source'].toString());
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        return data.hits.hits.map(entry => ({
          name: entry['_source']['name'],
          experimentTarget: entry['_source']['experimentTarget'],
          assayType: entry['_source']['assayType'],
          key: entry['_source']['key']
          } as ProtocolFile)
        );
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getExperimentProtocol(id: string) {
    const url = this.hostSetting.host + 'protocol_files/' + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getOrganismSummary(id: string) {
    const url = this.hostSetting.host + 'summary_organism/' + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimenSummary(id: string) {
    const url = this.hostSetting.host + 'summary_specimen/' + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getDatasetSummary(id: string) {
    const url = this.hostSetting.host + 'summary_dataset/' + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getFileSummary(id: string) {
    const url = this.hostSetting.host + 'summary_file/' + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getRulesetSample(category: string) {
    let rule_type;
    if (category === 'standard') {
      rule_type = 'core';
      category = 'core';
    } else {
      rule_type = 'type';
    }
    const url = ruleset_prefix_new + `${rule_type}/samples/faang_samples_${category}.metadata_rules.json`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getRulesetExperiment() {
    const url =  ruleset_prefix_old + 'faang_experiments.metadata_rules.json';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getRulesetAnalysis() {
    const url =  ruleset_prefix_old + 'faang_analyses.metadata_rules.json';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  startValidation(task_id, room_id, rules_type) {
    const url =  validation_service_url + '/validation/' + rules_type + '/' + task_id + '/' + room_id;
    return this.http.get(url);
  }

  startConversion(task_id, room_id, rules_type) {
    const url = validation_service_url + '/submission/' + rules_type + '/' + task_id + '/' + room_id;
    return this.http.get(url);
  }

  getTemplate(task_id, room_id, data_type) {
    const url = `${validation_service_url}/submission/get_template/${task_id}/${room_id}/${data_type}`;
    return this.http.get(url);
  }

  chooseDomain(username, password, mode, room_id) {
    const url = `${validation_service_url}/submission/samples/${room_id}/choose_domain`;
    return this.http.post(url, {username: username, password: password, mode: mode});
  }

  submitDomain(username, password, mode, domain_name, domain_description, room_id) {
    const url = `${validation_service_url}/submission/samples/${room_id}/submit_domain`;
    return this.http.post(url, {username: username, password: password, mode: mode, domain_name: domain_name,
      domain_description: domain_description});
  }

  submitRecords(username, password, mode, domain_name, room_id, task_id, submission_type) {
    const url = `${validation_service_url}/submission/${submission_type}/${task_id}/${room_id}/submit_records`;
    if (domain_name !== '') {
      return this.http.post(url, {username: username, password: password, mode: mode, domain_name: domain_name});
    } else {
      return this.http.post(url, {username: username, password: password, mode: mode});
    }
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
