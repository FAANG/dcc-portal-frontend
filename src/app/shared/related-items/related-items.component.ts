import {Component, Input, OnInit} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import * as FileSaver from 'file-saver';
import setting from './related-items.component.setting.json';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @Input() record_id: string; // the record id used to retrieve particular record
  @Input() source_type: string; // equal to the type of detail page, e.g. to list files in the dataset detail page, set to be dataset
  @Input() target_type: string; // the related entities, e.g. to list files in the dataset detail page, set to be file
  @Input() download_key: string; // if download not needed (normally not file), set to empty string, otherwise to the link attribute

  records: any;
  urls: string[] = [];
  checked = false;
  selected: Map<string, boolean> = new Map();

  p = 1; // page number for html template
  // to use this component, 4 steps:
  // Step 1: add corresponding setting in the setting json file
  // Step 2: in ngOnInit, add else if to retrieve the data
  // Step 3: add this component into the detail page
  // Step 4: make necessary adjustment (i.e. debugging) to the setting

  constructor(private dataService: ApiDataService) {
  }

  ngOnInit() {
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
      this.dataService.getAllOrganismsFromProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
        }
      );
    } else if (relationship_type === 'project-specimen') {
      this.dataService.getAllSpecimensForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
        }
      );
    } else if (relationship_type === 'project-publication') {
      this.dataService.getAllArticlesForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
        }
      );
    } else if (relationship_type === 'project-file') {
      this.dataService.getAllFilesForProject(this.record_id).subscribe(
        (data: any) => {
          this.records = data;
        }
      );
    } else if (relationship_type === 'publication-dataset') {
      this.dataService.getArticle(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['relatedDatasets'];
          for (const record of this.records) {
            record['species'] = record['species'].sort();
          }
        }
      );
    } else if (relationship_type === 'analysis-file') {
      this.dataService.getAnalysis(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['files'];
        });
    } else if (relationship_type === 'file-download') {
      this.dataService.getFilesByRun(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'file-paper') {
      this.dataService.getFile(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'dataset-specimen') {
      this.dataService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['specimen'];
        });
    } else if (relationship_type === 'dataset-file') {
      this.dataService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['file'];
        });
    } else if (relationship_type === 'dataset-paper') {
      this.dataService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'dataset-analysis') {
      this.dataService.getAnalysesByDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'organism-paper') {
      this.dataService.getOrganism(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'organism-specimen') {
      this.dataService.getOrganismsSpecimens(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'specimen-paper') {
      this.dataService.getSpecimen(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'specimen-specimen') {
      this.dataService.getSpecimenRelationships(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'specimen-file') {
      this.dataService.getSpecimenFiles(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'specimen-analysis') {
      this.dataService.getAnalysesBySample(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'project-paper') {
      this.records = [{}];
    } else if (relationship_type === 'project-specimen') {
      this.records = [{}];
    } else if (relationship_type === 'project-file') {
      this.records = [{}];
    }
  }

  // get table headers
  get_all_fields() {
    return setting[this.source_type][this.target_type]['all'];
  }

  get_displayed_fields() {
    const results: string[] = [];
    const all_fields = this.get_all_fields();
    // use all_fields to conserve the display order
    for (const column of all_fields) {
      if (this.isDisplayed(column)) {
        results.push(column);
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
  }
}
