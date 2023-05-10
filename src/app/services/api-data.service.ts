import { Injectable } from '@angular/core';
import { HostSetting } from './host-setting';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {throwError, EMPTY} from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';
import {
  ArticleTable, AnalysisTable, DatasetTable, FileTable, FileForProjectTable, OrganismTable, OrganismForProjectTable,
  ProtocolFile, ProtocolSample, SpecimenTable, SpecimenForProjectTable, PipelineTable, ProtocolAnalysis
} from '../shared/interfaces';
import {ruleset_prefix_old, ruleset_prefix_new, validation_service_url} from '../shared/constants';
import {UserService} from './user.service';
import {replaceUnderscoreWithSpace} from '../shared/common_functions';
import {protocolNames} from '../shared/protocolnames';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  hostSetting = new HostSetting;

  constructor(private http: HttpClient,
              private _userService: UserService) { }

  getAllFiles(query: any, size: number) {
    const url = `${this.hostSetting.host}data/file/_search/?size=${size}`;
    const aggs = {
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'fileName': 'name',
      'study': 'study.accession',
      'experiment': 'experiment.accession',
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'specimen': 'specimen',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' +
      query['sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
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
          paperPublished: entry['_source']['paperPublished'],
          submitterEmail: entry['_source']['submitterEmail']
          } as FileTable )
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getEnsemblAnnotationData(project: string, sort: string, offset: number) {
    const res = {};
    const project_filter = JSON.stringify({
      'project.keyword': [project]
    });
    const url = `${this.hostSetting.host}data/ensembl_annotation/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data['hits']['hits'].map(ele => ele['_source']);
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getTrackhubsData() {
    const res = {};
    const url = `${this.hostSetting.host}data/trackhubs/_search/?size=10`;
    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data['hits']['hits'].map(ele => ele['_source']);
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  downloadRecords(index: string, mapping: any, query: any) {
    const url = `${this.hostSetting.host}data/${index}/download/`;
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (mapping[prop] && (prop !== mapping[prop])) {
        filters[mapping[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('columns', JSON.stringify(query['columns'])).set('file_format', query['file_format']);
    const fullURL = `${url}?${params.toString()}`;
    return this.http.get(fullURL, {responseType: 'blob' as 'blob'}).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  downloadGraphqlRecords(selectedIndicesArray: any, selectedColumns: any, query: any, queryName: any) {
    const url = `${this.hostSetting.host}graphql/download`;
    const params = new HttpParams()
      .set('selected_indices', JSON.stringify(selectedIndicesArray))
      .set('selected_columns', JSON.stringify(selectedColumns))
      .set('query', JSON.stringify(query))
      .set('query_name', JSON.stringify(queryName));
    const fullURL = `${url}?${params.toString()}`;
    return this.http.get(fullURL, {responseType: 'blob' as 'blob'}).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  getAllFilesForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/file/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
              name: entry['_source']['name'],
              fileId: entry['_id'],
              experiment: entry['_source']['experiment']['accession'],
              assayType: entry['_source']['experiment']['assayType'],
              experimentTarget: entry['_source']['experiment']['target'],
              run: entry['_source']['run']['accession'],
              readableSize: entry['_source']['readableSize'],
              checksum: entry['_source']['checksum'],
              checksumMethod: entry['_source']['checksumMethod'],
              url: entry['_source']['url'],
            private: entry['_source']['private']
            } as FileForProjectTable )
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: [project]
      });
      let url = `${this.hostSetting.host}data/file/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
            name: entry['_source']['name'],
            fileId: entry['_id'],
            experiment: entry['_source']['experiment']['accession'],
            assayType: entry['_source']['experiment']['assayType'],
            experimentTarget: entry['_source']['experiment']['target'],
            run: entry['_source']['run']['accession'],
            readableSize: entry['_source']['readableSize'],
            checksum: entry['_source']['checksum'],
            checksumMethod: entry['_source']['checksumMethod'],
            url: entry['_source']['url'],
            private: false
            } as FileForProjectTable )
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  getAllDatasetsForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/dataset/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map(entry => ({
              datasetAccession: entry['_source']['accession'],
              title: entry['_source']['title'],
              species: entry['_source']['species'][0]['text'],
              archive: entry['_source']['archive'][0],
              assayType: entry['_source']['assayType'][0],
              numberOfExperiments: entry['_source']['experiment'].length,
              numberOfSpecimens: entry['_source']['specimen'].length,
              numberOfFiles: entry['_source']['file'].length,
              standard: entry['_source']['standardMet'],
              private: entry['_source']['private']
            } as DatasetTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: [project]
      });
      let url = `${this.hostSetting.host}data/dataset/_search/?size=10&filters=${project_filter}&from_=${offset}&search=${search}`;
      const sort_field = sort.split(':')[0];
      if ( sort_field === 'experiment' || sort_field === 'specimen' || sort_field === 'file') {
        url = url + '&sort_by_count=' + sort;
      } else {
        url = url + '&sort=' + sort;
      }
      return this.http.get(url).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map(entry => ({
              datasetAccession: entry['_source']['accession'],
              title: entry['_source']['title'],
              species: entry['_source']['species'][0]['text'],
              archive: entry['_source']['archive'][0],
              assayType: entry['_source']['assayType'][0],
              numberOfExperiments: entry['_source']['experiment'].length,
              numberOfSpecimens: entry['_source']['specimen'].length,
              numberOfFiles: entry['_source']['file'].length,
              standard: entry['_source']['standardMet'],
              private: false
          } as DatasetTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  getFile(fileId: string, mode: string) {
    let url = `${this.hostSetting.host}data/file/${fileId}`;
    if (mode === 'private') {
      url = 'https://api.faang.org/private_portal/file/' + fileId;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getFilesByRun(runId: any, sort: string, offset: number, search: string, mode: string) {
    const run_filter = JSON.stringify({
      'run.accession': [runId]
    });
    let url = `${this.hostSetting.host}data/file/_search/?filters=${run_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/file/${runId}`;
      return this.http.get<any>(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    const res = {};
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getExperimentByAccession(experimentId: string) {
    const url = `${this.hostSetting.host}data/experiment/${experimentId}`;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllOrganisms(query: any, size: number) {
    const url = `${this.hostSetting.host}data/organism/_search/?size=${size}`;
    const aggs = {
      'sex': 'sex.text',
      'organism': 'organism.text',
      'breed': 'breed.text',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'bioSampleId': 'biosampleId',
      'sex': 'sex.text',
      'organism': 'organism.text',
      'breed': 'breed.text',
      'standard': 'standardMet',
      'idNumber': 'id_number',
      'paper_published': 'paperPublished',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map(entry => ({
          bioSampleId: entry['_source']['biosampleId'],
          sex: entry['_source']['sex']['text'],
          organism: entry['_source']['organism']['text'],
          breed: entry['_source']['breed']['text'],
          standard: entry['_source']['standardMet'],
          idNumber: entry['_source']['id_number'],
          paperPublished: entry['_source']['paperPublished'],
          } as OrganismTable )
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllOrganismsFromProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/organism/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
              bioSampleId: entry['_source']['biosampleId'],
              sex: entry['_source']['sex']['text'],
              organism: entry['_source']['organism']['text'],
              breed: entry['_source']['breed']['text'],
              private: this.checkPrivateData(entry['_source']['customField'])
            } as OrganismForProjectTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        catchError(this.handleError),
      );
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: [project]
      });
      let url = `${this.hostSetting.host}data/organism/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
            bioSampleId: entry['_source']['biosampleId'],
            sex: entry['_source']['sex']['text'],
            organism: entry['_source']['organism']['text'],
            breed: entry['_source']['breed']['text'],
            private: this.checkPrivateData(entry['_source']['customField'])
          } as OrganismForProjectTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  checkPrivateData(entry: any) {
    for (const data of entry) {
      if (data['name'] === 'BovReg private submission') {
        return true;
      }
    }
  }

  getOrganism(biosampleId: string, mode: string) {
    let url = `${this.hostSetting.host}data/organism/${biosampleId}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/organism/${biosampleId}/`;
      return this.http.get<any>(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getOrganismsSpecimens(biosampleId: any, sort: string, offset: number, mode: string, search: string) {
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/specimen/?q=organism.biosampleId:${biosampleId}&size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    } else {
      const organism_filter = JSON.stringify({
        "organism.biosampleId": [biosampleId]
      });
      let url = `${this.hostSetting.host}data/specimen/_search/?filters=${organism_filter}&sort=${sort}&size=10&from_=${offset}&search=${search}`;
      return this.http.get<any>(url).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  getAllSpecimensForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/specimen/?size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
              bioSampleId: entry['_source']['biosampleId'],
              material: this.checkField(entry['_source']['material']),
              organismpart_celltype: this.checkField(entry['_source']['cellType']),
              sex: this.checkField(entry['_source']['organism']['sex']),
              organism: this.checkField(entry['_source']['organism']['organism']),
              breed: this.checkField(entry['_source']['organism']['breed']),
            private: this.checkPrivateData(entry['_source']['customField'])
            } as SpecimenForProjectTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        catchError(this.handleError),
      );
    } else {
      const project_filter = JSON.stringify({
        secondaryProject: [project]
      });
      let url = `${this.hostSetting.host}data/specimen/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get(url).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits.map( entry => ({
            bioSampleId: entry['_source']['biosampleId'],
            material: this.checkField(entry['_source']['material']),
            organismpart_celltype: this.checkField(entry['_source']['cellType']),
            sex: this.checkField(entry['_source']['organism']['sex']),
            organism: this.checkField(entry['_source']['organism']['organism']),
            breed: this.checkField(entry['_source']['organism']['breed']),
            private: this.checkPrivateData(entry['_source']['customField'])
            } as SpecimenForProjectTable)
          );
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  getAllProtocolSamplesForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: [project]
    });
    const url = `${this.hostSetting.host}data/protocol_samples/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;

    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map(entry => ({
            key: entry['_source']['key'],
            protocol_name: entry['_source']['protocolName'],
            university_name: entry['_source']['universityName'],
            protocol_date: entry['_source']['protocolDate']
          } as ProtocolSample)
        );
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllProtocolFilesForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: [project]
    });
    const url = `${this.hostSetting.host}data/protocol_files/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map(entry => ({
            key: entry['_source']['key'],
            protocol_type: protocolNames[entry['_source']['name']],
            experiment_target: entry['_source']['experimentTarget'],
            assay_type: entry['_source']['assayType']
          } as ProtocolFile)
        );
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllProtocolAnalysisForProject(project: string, mode: string, sort: string, offset: number, search: string) {
    const res = {};
    const project_filter = JSON.stringify({
      secondaryProject: [project]
    });
    const url = `${this.hostSetting.host}data/protocol_analysis/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map(entry => ({
            key: entry['_source']['key'],
            protocol_name: entry['_source']['protocolName'],
            university_name: entry['_source']['universityName'],
            protocol_date: entry['_source']['protocolDate']
          } as ProtocolAnalysis)
        );
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSpecimens(query: any, size: number) {
    const url = `${this.hostSetting.host}data/specimen/_search/?size=${size}`;
    const aggs = {
      'standard': 'standardMet',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'bioSampleId': 'biosampleId',
      'standard': 'standardMet',
      'id_number': 'id_number',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished',
      'trackhubUrl': 'trackhubUrl'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
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
          paperPublished: entry['_source']['paperPublished'],
          trackhubUrl: entry['_source']['trackhubUrl'],
          } as SpecimenTable)
        );
        res['totalHits'] = data.hits.total.value;
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

  getSpecimen(biosampleId: string, mode: string) {
    let url = `${this.hostSetting.host}data/specimen/${biosampleId}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/specimen/${biosampleId}`;
      return this.http.get<any>(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimenFiles(biosampleId: any, sort: string, offset: number, search: string) {
    const specimen_filter = JSON.stringify({
      specimen: [biosampleId]
    });
    const url = `${this.hostSetting.host}data/file/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  getSpecimenRelationships(biosampleId: any, sort: string, offset: number, search: string) {
    const specimen_filter = JSON.stringify({
      allDeriveFromSpecimens: [biosampleId]
    });
    const url = `${this.hostSetting.host}data/specimen/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDatasets(query: any, size: number) {
    const url = `${this.hostSetting.host}data/dataset/_search/?size=${size}`;
    const aggs = {
      'archive': 'archive',
      'species': 'species.text',
      'assay_type': 'assayType',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
      'project': 'secondaryProject'
    };
    const mapping = {
      'datasetAccession': 'accession',
      'title': 'title',
      'species': 'species.text',
      'archive': 'archive',
      'assayType': 'assayType',
      'numberOfExperiments': 'experiment',
      'numberOfSpecimens': 'specimen',
      'numberOfFiles': 'file',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    let params = new HttpParams().set('_source', query['_source'].toString()).set('filters', JSON.stringify(filters)).set('aggs',
      JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    if (query['sort'][0] === 'numberOfExperiments' || query['sort'][0] === 'numberOfSpecimens' || query['sort'][0] === 'numberOfFiles') {
      params = params.set('sort_by_count', sortParams);
    } else {
      params = params.set('sort', sortParams);
    }
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          datasetAccession: entry['_source']['accession'],
          title: entry['_source']['title'],
          species: this.getSpeciesStr(entry),
          archive: entry['_source']['archive'].toString(),
          assayType: entry['_source']['assayType'].toString(),
          numberOfExperiments: entry['_source']['experiment']['length'],
          numberOfSpecimens: entry['_source']['specimen']['length'],
          numberOfFiles: entry['_source']['file']['length'],
          standard: entry['_source']['standardMet'],
          paperPublished: entry['_source']['paperPublished'],
          submitterEmail: entry['_source']['submitterEmail']
          } as DatasetTable)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
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

  getDataset(accession: string, mode: string) {
    let url = `${this.hostSetting.host}data/dataset/${accession}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/dataset/${accession}`;
      return this.http.get<any>(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllAnalyses(query: any, size: number) {
    const url = `${this.hostSetting.host}data/analysis/_search/?size=${size}`;
    const aggs = {
      'dataset': 'datasetAccession',
      'species': 'organism.text',
      'assay_type': 'assayType',
      'analysis_type': 'analysisType',
      'standard': 'standardMet',
      'project': 'secondaryProject'
    };
    const mapping = {
      'accession': 'accession',
      'datasetAccession': 'datasetAccession',
      'title': 'title',
      'species': 'organism.text',
      'assayType': 'assayType',
      'analysisType': 'analysisType',
      'standard': 'standardMet'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          accession: entry['_source']['accession'],
          datasetAccession: entry['_source']['datasetAccession'],
          title: entry['_source']['title'],
          species: entry['_source']['organism']['text'],
          assayType: entry['_source']['assayType'],
          analysisType: replaceUnderscoreWithSpace(entry['_source']['analysisType']),
          standard: entry['_source']['standardMet']
          } as AnalysisTable)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAnalysesBySample(sampleId: any, sort: string, offset: number, search: string) {
    const specimen_filter = JSON.stringify({
      sampleAccessions: [sampleId]
    });
    const url = `${this.hostSetting.host}data/analysis/_search/?filters=${specimen_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits;
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }


  getAnalysesByDataset(accession: any, sort: string, offset: number, mode: string, search: string) {
    const res = {};
    if (mode === 'private') {
      let url = `${this.hostSetting.host}private_portal/analysis/?q=datasetAccession:${accession}&size=10&from_=${offset}&search=${search}`;
      return this.http.get(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits;
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    } else {
      const dataset_filter = JSON.stringify({
        datasetAccession: [accession]
      });
      let url = `${this.hostSetting.host}data/analysis/_search/?filters=${dataset_filter}&size=10&sort=${sort}&from_=${offset}&search=${search}`;
      return this.http.get<any>(url).pipe(
        map((data: any) => {
          res['data'] = data.hits.hits;
          res['totalHits'] = data.hits.total.value;
          return res;
        }),
        retry(3),
        catchError(this.handleError),
      );
    }
  }

  getAnalysis(accession: string, mode: string) {
    let url = `${this.hostSetting.host}data/analysis/${accession}`;
    if (mode === 'private') {
      url = `https://api.faang.org/private_portal/analysis/${accession}`;
      return this.http.get<any>(url, {headers: new HttpHeaders({'Authorization': `jwt ${this._userService.token}`})}).pipe(
        retry(3),
        catchError(this.handleError),
      );
    }
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllArticlesForProject(project: string, sort: string, offset: number, search: string) {
    const project_filter = JSON.stringify({
      secondaryProject: [project]
    });
    const url = `${this.hostSetting.host}data/article/_search/?size=10&filters=${project_filter}&sort=${sort}&from_=${offset}&search=${search}`;
    const res = {};
    return this.http.get(url).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          id: entry['_id'],
          title: entry['_source']['title'],
          year: entry['_source']['year'],
          journal: entry['_source']['journal'],
          datasetSource: entry['_source']['datasetSource']
          } as ArticleTable)
        );
        res['totalHits'] = data.hits.total.value;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllPipelinesForProject(project: string) {
    const url = this.hostSetting.relatedProjectsHost + project.toLowerCase() + '/pipelines.tsv';
    let pipelineArr: any[] = [];
    return this.http.get(url, {responseType: 'text'})
      .pipe(
        map((data: any) => {
          const lineArr = data.split('\n');
          pipelineArr = lineArr
            .map((line) => {
              const [name, assayType, link, documentation, platform] = line.split('\t');
              return {name, assayType, link, documentation, platform} as PipelineTable;
            }).filter(ele => ele.name !== 'Pipeline name' && ele.assayType !== 'Assay type');
          return pipelineArr;
        }),
        retry(1),
        catchError(error => {
          if (!(error.error instanceof ErrorEvent)) {
            if (error.status === 404) {
              return EMPTY.pipe(
                map(() => {
                  return [];
                }),
              );
            }
            return throwError(
              'Something bad happened; please try again later.');
          }
        }),
      );
  }

  getAllArticles(query: any, size: number) {
    const url = `${this.hostSetting.host}data/article/_search/?size=${size}`;
    const aggs = {
      'year': 'year',
      'journal': 'journal',
      'datasetSource': 'datasetSource',
      'project': 'secondaryProject',
      'source': 'source'
    };
    const mapping = {
      'title': 'title',
      'year': 'year',
      'journal': 'journal',
      'datasetSource': 'datasetSource',
      'source': 'source'
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          id: entry['_id'],
          title: entry['_source']['title'],
          year: entry['_source']['year'],
          journal: entry['_source']['journal'],
          datasetSource: entry['_source']['datasetSource'],
          source: entry['_source']['source']
          } as ArticleTable)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getArticle(id: string) {
    const url = `${this.hostSetting.host}data/article/${id}`;
    return this.http.get<any>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllSamplesProtocols(query: any, size: number) {
    const url = `${this.hostSetting.host}data/protocol_samples/_search/?size=${size}`;
    const aggs = {
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          key: entry['_source']['key'],
          protocol_name: entry['_source']['protocolName'],
          university_name: entry['_source']['universityName'],
          protocol_date: entry['_source']['protocolDate'],
          } as ProtocolSample)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSampleProtocol(id: string) {
    const url = `${this.hostSetting.host}data/protocol_samples/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe(
      map( (data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllAnalysisProtocols(query: any, size: number) {
    const url = `${this.hostSetting.host}data/protocol_analysis/_search/?size=${size}`;
    const aggs = {
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          key: entry['_source']['key'],
          protocol_name: entry['_source']['protocolName'],
          university_name: entry['_source']['universityName'],
          protocol_date: entry['_source']['protocolDate'],
          } as ProtocolSample)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAnalysisProtocol(id: string) {
    const url = `${this.hostSetting.host}data/protocol_analysis/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe(
      map( (data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllExperimentsProtocols(query: any, size: number) {
    const url = `${this.hostSetting.host}data/protocol_files/_search/?size=${size}`;
    const aggs = {
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType',
      'project': 'secondaryProject'
    };
    const mapping = {
      'key': 'key',
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType',
    };
    const filters = query['filters'];
    for (const prop of Object.keys(filters)) {
      if (aggs[prop] && (prop !== aggs[prop])) {
        filters[aggs[prop]] = filters[prop];
        delete filters[prop];
      }
    }
    const sortParams = mapping[query['sort'][0]] ? mapping[query['sort'][0]] + ':' + query['sort'][1] : query['sort'][0] + ':' + query[
      'sort'][1];
    const params = new HttpParams().set('_source', query['_source'].toString()).set('sort', sortParams).set('filters',
      JSON.stringify(filters)).set('aggs', JSON.stringify(aggs)).set('from_', query['from_']).set('search', query['search']);
    const res = {};
    return this.http.get(url, {params: params}).pipe(
      map((data: any) => {
        res['data'] = data.hits.hits.map( entry => ({
          key: entry['_source']['key'],
          protocol_type: protocolNames[entry['_source']['name']],
          experiment_target: entry['_source']['experimentTarget'],
          assay_type: entry['_source']['assayType'],
          } as ProtocolFile)
        );
        res['totalHits'] = data.hits.total.value;
        res['aggregations'] = data.aggregations;
        return res;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getExperimentProtocol(id: string) {
    const url = `${this.hostSetting.host}data/protocol_files/${encodeURIComponent(id)}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getOrganismSummary(id: string) {
    const url = `${this.hostSetting.host}data/summary_organism/${id}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getSpecimenSummary(id: string) {
    const url = `${this.hostSetting.host}data/summary_specimen/${id}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getDatasetSummary(id: string) {
    const url = `${this.hostSetting.host}data/summary_dataset/${id}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  getFileSummary(id: string) {
    const url = `${this.hostSetting.host}data/summary_file/${id}`;
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
      if (category.indexOf('teleostei') !== -1) {
        rule_type = 'module';
        category = category.replace('teleostei', 'teleost');
      } else {
        rule_type = 'type';
        if (category === 'specimen_standard_rules') {
          category = 'specimen';
        }
      }
    }
    const url = ruleset_prefix_new + `${rule_type}/samples/faang_samples_${category}.metadata_rules.json`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  getRulesetExperiment(category: string) {
    let rule_type;
    if (category === 'standard') {
      rule_type = 'core';
      category = 'core';
    } else if (category === 'chip-seq_dna-binding_proteins' || category === 'chip-seq_input_dna') {
      rule_type = 'module';
    } else {
      rule_type = 'type';
      if (category === 'chip-seq_standard_rules') {
        category = 'chip-seq';
      }
    }
    const url = ruleset_prefix_new + `${rule_type}/experiments/faang_experiments_${category}.metadata_rules.json`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  getRulesetAnalysis(category: string) {
    let rule_type;
    if (category === 'eva') {
      rule_type = 'module';
    } else {
      rule_type = 'type';
    }
    const url = ruleset_prefix_new + `${rule_type}/analyses/faang_analyses_${category}.metadata_rules.json`;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError),
    );
  }

  startValidation(submission_type, task_id, room_id, rules_type) {
    const url =  validation_service_url + '/validation/' + submission_type + '/' + rules_type + '/' + task_id + '/' + room_id;
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

  chooseDomain(username, password, mode, room_id, private_submission) {
    const url = `${validation_service_url}/submission/samples/${room_id}/choose_domain`;
    return this.http.post(url, {username: username, password: password, mode: mode, private_submission: private_submission});
  }

  submitDomain(username, password, mode, domain_name, domain_description, room_id, private_submission) {
    const url = `${validation_service_url}/submission/samples/${room_id}/submit_domain`;
    return this.http.post(url, {username: username, password: password, mode: mode, domain_name: domain_name,
      domain_description: domain_description, private_submission: private_submission});
  }

  submitRecords(action, username, password, mode, domain_name, room_id, task_id, submission_type, private_submission) {
    const url = `${validation_service_url}/submission/${action}/${submission_type}/${task_id}/${room_id}/submit_records`;
    if (domain_name !== '') {
      return this.http.post(url, {username: username, password: password, mode: mode, domain_name: domain_name,
        private_submission: private_submission});
    } else {
      return this.http.post(url, {username: username, password: password, mode: mode, private_submission: private_submission});
    }
  }

  get_pubsub_messages() {
    const url = `${this.hostSetting.host}data/submission_portal_status/_search/?size=1`;

    const mapping = {
      'enaStatus': 'ena_status',
      'biosampleStatus': 'biosample_status'
    };
    return this.http.get(url).pipe(
      map((data: any) => {
        const res = data.hits.hits.map(entry => ({
            enaStatus: entry['_source']['ena_status'],
            biosampleStatus: entry['_source']['biosample_status']
          })
        );
        return res;
      }),
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
      error);
  }
}
