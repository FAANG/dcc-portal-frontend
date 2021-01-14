import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import * as FileSaver from 'file-saver';
import setting from './related-items.component.setting.json';
import {UserService} from '../../services/user.service';
import {Observable, of as observableOf} from 'rxjs';
import {TableClientSideComponent}  from '../table-client-side/table-client-side.component';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @ViewChild('linkTemplate', { static: true }) linkTemplate: TemplateRef<any>;
  @ViewChild('downloadTemplate', { static: true }) downloadTemplate: TemplateRef<any>;
  @ViewChild('downloadHeaderTemplate', { static: true }) downloadHeaderTemplate: TemplateRef<any>;
  @ViewChild(TableClientSideComponent, { static: true }) tableClientComponent: TableClientSideComponent;
  @Input() record_id: string; // the record id used to retrieve particular record
  @Input() source_type: string; // equal to the type of detail page, e.g. to list files in the dataset detail page, set to be dataset
  @Input() target_type: string; // the related entities, e.g. to list files in the dataset detail page, set to be file
  @Input() download_key: string; // if download not needed (normally not file), set to empty string, otherwise to the link attribute

  records: any;
  tableData: Observable<any[]>;
  columnNames = [];
  displayFields = [];
  templates = {};
  urls: string[] = [];
  checked = false;
  selected: Map<string, boolean> = new Map();

  p = 1; // page number for html template
  // to use this component, 4 steps:
  // Step 1: add corresponding setting in the setting json file
  // Step 2: in ngOnInit, add else if to retrieve the data
  // Step 3: add this component into the detail page
  // Step 4: make necessary adjustment (i.e. debugging) to the setting

  constructor(private dataService: ApiDataService, private _userService: UserService) {
  }

  ngOnInit() {
    this.templates = {'bioSampleId': this.linkTemplate,
                      'title': this.linkTemplate,
                      'accession': this.linkTemplate,
                      'name': this.linkTemplate};
    // Read in the initial column display settings
    // set those selected to be displayed
    for (const column of setting[this.source_type][this.target_type]['all']) {
      this.selected.set(column, false);
    }
    for (const column of setting[this.source_type][this.target_type]['display']) {
      this.selected.set(column, true);
    }

    const relationship_type = `${this.source_type}-${this.target_type}`;
    if (relationship_type === 'project-organism') {
      let mode: string;
      this._userService.token ? mode = 'private' : mode = 'public';
      this.dataService.getAllOrganismsFromProject(this.record_id, mode).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        }
      );
    } else if (relationship_type === 'project-specimen') {
      this.dataService.getAllSpecimensForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        }
      );
    } else if (relationship_type === 'project-publication') {
      this.dataService.getAllArticlesForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        }
      );
    } else if (relationship_type === 'project-file') {
      this.dataService.getAllFilesForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        }
      );
    } else if (relationship_type === 'publication-dataset') {
      this.dataService.getArticle(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['relatedDatasets'];
          for (const record of this.records) {
            record['species'] = record['species'].sort();
          }
          this.tableData = observableOf(this.records);
        }
      );
    } else if (relationship_type === 'analysis-file') {
      this.dataService.getAnalysis(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['files'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'file-download') {
      this.dataService.getFilesByRun(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'].map((record) => record['_source']);
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'file-paper') {
      this.dataService.getFile(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'dataset-specimen') {
      this.dataService.getDatasetSpecimen(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'dataset-file') {
      this.dataService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['file'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'dataset-paper') {
      this.dataService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'dataset-analysis') {
      this.dataService.getAnalysesByDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'organism-paper') {
      this.dataService.getOrganism(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'organism-specimen') {
      this.dataService.getOrganismsSpecimens(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'specimen-paper') {
      this.dataService.getSpecimen(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'specimen-specimen') {
      this.dataService.getSpecimenRelationships(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'specimen-file') {
      this.dataService.getSpecimenFiles(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
          this.tableData = observableOf(this.records);
        });
    } else if (relationship_type === 'specimen-analysis') {
      this.dataService.getAnalysesBySample(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
          this.tableData = observableOf(this.records);
        });
    }
    this.columnNames = this.get_displayed_fields()['column_names'];
    this.displayFields = this.get_displayed_fields()['fields'];
    if (this.download_key.length > 0) {
      this.columnNames.push('Download');
      this.displayFields.push(this.download_key);
      this.templates[this.download_key] = this.downloadTemplate;
      this.templates[this.download_key + '-header'] = this.downloadHeaderTemplate;
    }
  }

  isRecordPrivate(record: any) {
    return record.private;
  }

  // get table headers
  get_all_fields() {
    var result = {};
    result['column_names'] = setting[this.source_type][this.target_type]['all'];
    result['fields'] = result['column_names'].map((col) => 
      setting[this.source_type][this.target_type]['fields'][col]['value']
    );
    return result;
  }

  get_displayed_fields() {
    var results = {'column_names': [], 'fields': []};
    const all_fields = this.get_all_fields()['column_names'];
    // use all_fields to conserve the display order
    for (const column of all_fields) {
      if (this.isDisplayed(column)) {
        results['column_names'].push(column);
        results['fields'].push(setting[this.source_type][this.target_type]['fields'][column]['value']);
      }
    }
    return results;
  }

  // get the attribute names to populate the table
  get_attr(field: string) {
    return setting[this.source_type][this.target_type]['fields'][field]['value'];
  }

  // the attributes to render the link
  get_field_values_for_links(attr: string) {
    return setting[this.source_type][this.target_type]['fields'][attr]['link'];
  }

  // only show the download button when the target is files
  showButton() {
    return this.target_type === 'file' || this.target_type === 'download';
  }

  downloadAllFiles() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  disableButton() {
    return this.urls.length === 0;
  }

  // get the number of files selected
  getUrlsLength() {
    return this.urls.length;
  }

  isDisplayed(field_name: string) {
    if (this.selected.has(field_name)) {
      return this.selected.get(field_name);
    }
    return false;
  }

  getValue(record: any, attr: string) {
    const elmts = attr.split('.');
    let curr: any = record;
    for (const elmt of elmts) {
      if (curr[elmt] === null || curr[elmt] === undefined) {
        return;
      }
      curr = curr[elmt];
    }
    return curr;
  }

  // the behaviour of the checkbox in the table under Download column
  onCheckboxClick(url: string) {
    url = 'ftp://' + url;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
  }

  // the checked conversion_status of the checkbox in the table under Download column
  CheckboxChecked(url: string) {
    url = 'ftp://' + url;
    return this.urls.indexOf(url) !== -1;
  }

  // determine the checked conversion_status of the checkbox in the table header
  // return 2 means all files selected (checkbox checked conversion_status),
  // 1 means partially files selected (checkbox indeterminate conversion_status)
  // and 0 means none selected
  mainCheckboxChecked() {
    if (this.records) {
      if (this.urls.length === this.records.length) {
        this.checked = true;
        return 2;
      } else {
        this.checked = false;
        if (this.urls.length > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  // the behaviour of the checkbox in the table header
  mainCheckboxClicked() {
    if (this.checked === true) {
      this.urls = [];
    } else {
      const url_location = this.download_key.split('.');
      for (const record of this.records) {
        let curr: any = record;
        for (const index of url_location) {
          curr = curr[index];
        }
        const url = 'ftp://' + curr;
        const idx = this.urls.indexOf(url);
        if (idx === -1) {
          this.urls.push(url);
        }
      }
    }
    this.checked = !this.checked;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toggleSelectedColumn(column: string) {
    if (this.selected.has(column)) {
      this.selected.set(column, !this.selected.get(column));
    }
    this.displayFields = this.get_displayed_fields()['fields'];
    this.columnNames = this.get_displayed_fields()['column_names'];
    if (this.download_key.length > 0) {
      this.columnNames.push('Download');
      this.displayFields.push(this.download_key);
    }
  }
}
